const redisSMQConfig = require('../helpers/redisSMQConfig')
const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const { Message, Producer } = require('redis-smq')
const sleep = require('sleep-promise')
const { fromTextToAudio } = require('../helpers/fromTextToAudio')

const producer = new Producer('book-tts', redisSMQConfig)
const storage = new Storage()

exports.storyRawDataGCSTrigger = async (data) => {
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
  const storyData = JSON.parse(fs.readFileSync(tempFilePath, 'utf8'))

  const { chapter_data: { no, name, content } } = storyData
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
          if (err) console.log('Push story crawl data to queue failed', err)
          else console.log('Successfully push story crawl data to queue')

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

  await gcsObject.delete()
  fs.unlink(tempFilePath, () => {})
}
