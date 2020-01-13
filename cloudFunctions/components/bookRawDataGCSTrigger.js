const redisSMQConfig = require('../helpers/redisSMQConfig')
const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const { Message, Producer } = require('redis-smq')
const sleep = require('sleep-promise')
const { BOOK_REDIS_QUEUE_NAME } = require('../constants')

const producer = new Producer(BOOK_REDIS_QUEUE_NAME, redisSMQConfig)
const storage = new Storage()

exports.bookRawDataGCSTrigger = async (data) => {
  const { bucket: bucketName, name: fileName } = data

  const tempFilePath = `/tmp/${fileName}`
  const options = {
    destination: tempFilePath,
  }

  // Downloads the file
  const gcsObject = storage.bucket(bucketName).file(fileName)

  await gcsObject.download(options)
  const bookData = JSON.parse(fs.readFileSync(tempFilePath, 'utf8'))

  await saveToRedisQueue(bookData)

  await gcsObject.delete()
  fs.unlink(tempFilePath, () => {})
}

async function saveToRedisQueue (bookData) {
  let shouldEndFunction = false

  try {
    const message = new Message()
    message
      .setBody(bookData)
      .setTTL(60 * 60 * 1000)

    producer.produceMessage(message, (err) => {
      if (err) console.log('Push book crawl data to queue failed', err)
      else console.log('Successfully push book crawl data to queue')
      shouldEndFunction = true
    })
  } catch (err) {
    shouldEndFunction = true
    console.log(err.toString())
  }

  // Hack
  while (!shouldEndFunction) {
    await sleep(10) // Wait 10 ms
  }
}
