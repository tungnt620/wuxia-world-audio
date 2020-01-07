const redisSMQConfig = require('../helpers/redisSMQConfig')
const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const { Message, Producer } = require('redis-smq')
const sleep = require('sleep-promise')
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

async function tts (chapterData, bucketName) {
  const { no, name, content } = chapterData
  let shouldEndFunction = false

  try {
    fromTextToAudio(content,
      (errorStr) => {
        shouldEndFunction = true
        console.log(errorStr)
      },
      (successStr, fileName) => {
        const message = new Message()
        message
          .setBody({
            no,
            name,
            content,
            audio: `https://storage.googleapis.com/${bucketName}/${fileName}`
          })
          .setTTL(60 * 60 * 1000)

        producer.produceMessage(message, (err) => {
          if (err) console.log('Push book crawl data to queue failed', err)
          else console.log('Successfully push book crawl data to queue')

          producer.shutdown()
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
