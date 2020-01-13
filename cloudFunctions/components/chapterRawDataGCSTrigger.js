const redisSMQConfig = require('../helpers/redisSMQConfig')
const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const { Message, Producer } = require('redis-smq')
const sleep = require('sleep-promise')
const { BOOK_AUDIO_GCP_BUCKET_NAME } = require('../constants')
const { fromTextToAudio } = require('../helpers/fromTextToAudio')
const { CHAPTER_REDIS_QUEUE_NAME } = require('../constants')

const producer = new Producer(CHAPTER_REDIS_QUEUE_NAME, redisSMQConfig)
const storage = new Storage()

exports.chapterRawDataGCSTrigger = async (data) => {
  const { bucket: bucketName, name: fileName } = data

  const tempFilePath = `/tmp/${fileName}`
  const options = {
    destination: tempFilePath,
  }

  // Downloads the file
  const gcsObject = storage
    .bucket(bucketName)
    .file(fileName)

  await gcsObject.download(options)
  const chapterData = JSON.parse(fs.readFileSync(tempFilePath, 'utf8'))

  await tts(chapterData, bucketName)

  await gcsObject.delete()
  fs.unlink(tempFilePath, () => {})
}

async function tts (chapterData) {
  const { text } = chapterData
  let shouldEndFunction = false

  try {
    fromTextToAudio(text,
      (errorStr) => {
        shouldEndFunction = true
        console.log(errorStr)
      },
      (successStr, fileName) => {
        const message = new Message()
        message
          .setBody({
            ...chapterData,
            audio: `https://storage.googleapis.com/${BOOK_AUDIO_GCP_BUCKET_NAME}/${fileName}`
          })
          .setTTL(60 * 60 * 1000)

        producer.produceMessage(message, (err) => {
          if (err) console.log('Push chapter crawl data to queue failed', err)
          else console.log('Successfully push chapter crawl data to queue')
          shouldEndFunction = true
        })
      }
    )
  } catch (err) {
    shouldEndFunction = true
    console.log(err.toString())
  }

  // Hack
  while (!shouldEndFunction) {
    await sleep(10) // Wait 10 ms
  }
}
