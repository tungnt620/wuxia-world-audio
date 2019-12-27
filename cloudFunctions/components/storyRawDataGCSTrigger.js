const redisSMQConfig = require('../helpers/redisSMQConfig')
const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const { Message, Producer } = require('redis-smq')
const producer = new Producer('story-tts', redisSMQConfig)

const { fromTextToAudio } = require('../helpers/fromTextToAudio')
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

  // How to make this function async await, current it not wait for callback run, gcf run and ignore it
  fromTextToAudio(content,
    (errorStr) => console.log(errorStr),
    (successStr, mediaLink) => {

      const message = new Message()
      message
        .setBody({
          no,
          name,
          content,
          contentAudioLink: mediaLink
        })
        .setTTL(60 * 60 * 1000)

      producer.produceMessage(message, (err) => {
        if (err) console.log('Push story crawl data to queue failed', err)
        else console.log('Successfully push story crawl data to queue')
        producer.shutdown()
      })
    }
  )

  await gcsObject.delete()
  fs.unlink(tempFilePath, () => {})
}
