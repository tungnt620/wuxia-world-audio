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

// process.env.ENV we set in deploy command
const workingDir = process.env.ENV === 'cloud' ? path.join(os.tmpdir(), 'MP3') : 'MP3'
const gcpBucketName = 'story-chapter-audio'
const storage = new Storage()
const ttsClient = new TextToSpeech.TextToSpeechClient()

const languageCode = 'vi-VN', ssmlGender = 'MALE', audioName = 'vi-VN-Wavenet-D'

const fromTextToAudio = (textContent, callbackOnError, callbackOnSuccess) => {
  if (!textContent) {
    callbackOnError('No text provided!')
  } else {
    rmrf(workingDir, () => {
      fs.mkdirSync(workingDir)
      const chunkTextContent = chunkText(textContent, 5000)
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
                    createGcsObject(singleFilePath, (err, metadata) => {
                      if (err) {
                        callbackOnError('Could not send audio to GCS.\n' + err)
                      } else {
                        callbackOnSuccess('File successfully sent to GCS', metadata['metadata']['mediaLink'])
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
  const ttsRequest = {
    input: { text: str },
    // input: { ssml: ssml },
    voice: { languageCode, name: audioName, ssmlGender },
    audioConfig: { audioEncoding: 'MP3' },
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

  const objectOptions = {
    destination: hash + '.mp3',
    public: true,
    metadata: {
      contentType: 'audio/mpeg',
      metadata: {
        // title: articleData.title,
        // author: articleData.author,
        // excerpt: articleData.excerpt,
        // url: articleData.url,
        // datePublished: articleData.date_published,
        // leadImageUrl: articleData.lead_image_url
      }
    }
  }

  storage
    .bucket(gcpBucketName)
    .upload(audioPath, objectOptions, (err, metadata, apiResponse) => {
      if (err) { cb(err, null) } else { cb(null, metadata) }
    })
}

exports.fromTextToAudio = fromTextToAudio

// fromTextToAudio('nguyễn thanh tùng',
//   (errorStr) => console.log(errorStr),
//   (successStr, mediaLink) => console.log(successStr, mediaLink)
// )
