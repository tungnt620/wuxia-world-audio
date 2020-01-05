const fs = require('fs')
const os = require('os')
const path = require('path')
const crypto = require('crypto')
const uuidv4 = require('uuid/v4')
const TextToSpeech = require('@google-cloud/text-to-speech')
const { Storage } = require('@google-cloud/storage')
const chunkText = require('chunk-text')
const async = require('async')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegStatic = require('ffmpeg-static')
const ffprobeStatic = require('ffprobe-static')
const rmrf = require('rimraf')
const { makeSSMLForBookContent } = require('./makeSSMLForBook')

const isCloud = process.env.ENV === 'cloud'

// process.env.ENV we set in deploy command
const workingDir = isCloud ? path.join(os.tmpdir(), 'MP3') : 'MP3'
const gcpBucketName = 'story-chapter-audio'
const storage = new Storage()
const ttsClient = new TextToSpeech.TextToSpeechClient()

const fromTextToAudio = (textContent, callbackOnError, callbackOnSuccess, isSSML = false) => {
  if (!textContent) {
    callbackOnError('No text provided!')
  } else {
    rmrf(workingDir, () => {
      fs.mkdirSync(workingDir)

      // Just few 5000 character because after that we need add some tag for SSML
      const chunkTextContent = chunkText(textContent, 4000)

      async.map(chunkTextContent, getTtsAudio, (err, audio) => {
        if (err) {
          callbackOnError('TTS conversion failed.\n' + err)
        } else {
          async.eachOf(audio, writeAudioFiles, (err) => {
            if (err) {
              callbackOnError('Failed to write audio segment(s) to disk.\n' + err)
            } else {
              fs.readdir(workingDir, (err, fileNames) => {
                fileNames.sort()
                let filePaths = fileNames.map((x) => { return path.join(workingDir, x) })
                concatAudioFiles(filePaths, (err, singleFilePath) => {
                  if (err) {
                    callbackOnError('Failed to concatinate audio files.\n' + err)
                  } else {
                    createGcsObject(singleFilePath, (err, fileName) => {
                      if (err) {
                        callbackOnError('Could not send audio to GCS.\n' + err)
                      } else {
                        callbackOnSuccess('File successfully sent to GCS', fileName)
                      }
                    })
                  }
                })
              })
            }
          })
        }
      })
    })
  }
}

// Uses Googles Text-To-Speech API to generate audio from text
function getTtsAudio (str, cb) {
  const languageCode = 'vi-VN', ssmlGender = 'MALE', audioName = 'vi-VN-Wavenet-D'

  const ssmlContent = makeSSMLForBookContent(str)

  const ttsRequest = {
    // input: { text: str },
    input: { ssml: ssmlContent },
    voice: { languageCode, name: audioName, ssmlGender },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.9,
      pitch: -8,
      effectsProfileId: ['handset-class-device'],
    },
  }

  ttsClient.synthesizeSpeech(ttsRequest, (err, res) => {
    if (err) { cb(err, null) } else { cb(null, res.audioContent) }
  })
}

function writeAudioFiles (audioData, key, cb) {
  key = key + 1000 // To make sorting of files easier later
  const filePath = path.join(workingDir, key + '.mp3')
  fs.writeFile(filePath, audioData, 'binary', (err) => {
    if (err) { cb(err) } else { cb(null) }
  })
}

function concatAudioFiles (filePaths, cb) {
  if (filePaths.length === 1) { cb(null, filePaths[0]) } else {
    const ffmpegCmd = ffmpeg()
    const singleFilePath = path.join(workingDir, 'article.mp3')

    filePaths.forEach((x) => { ffmpegCmd.input(x) })

    ffmpegCmd
      .setFfmpegPath(ffmpegStatic.path)
      .setFfprobePath(ffprobeStatic.path)
      .on('error', (err) => { cb(err, null) })
      .on('end', () => { cb(null, singleFilePath) })
      .mergeToFile(singleFilePath, workingDir)
  }
}

// Used to send concatinated audio file to Google Cloud Storage
function createGcsObject (audioPath, cb) {
  const hash = crypto.createHash('md5').update(uuidv4()).digest('hex')
  const fileName = hash + '.mp3'

  const objectOptions = {
    destination: fileName,
    public: true,
    metadata: {
      contentType: 'audio/mpeg',
    }
  }

  storage
    .bucket(gcpBucketName)
    .upload(audioPath, objectOptions, (err, metadata, apiResponse) => {
      if (err) { cb(err, null) } else { cb(null, fileName) }
    })
}

exports.fromTextToAudio = fromTextToAudio

// fromTextToAudio('nguyễn thanh tùng',
//   (errorStr) => console.log(errorStr),
//   (successStr, mediaLink) => console.log(successStr, mediaLink)
// )
