const { REDIS_SMQ_BOOK_TTS_QUEUE } = require('./share/constants')

require('dotenv').config()
const config = require('./helpers/redisSMQConfig')

const redisSMQ = require('redis-smq')
const Consumer = redisSMQ.Consumer

class SaveDataToDBConsumer extends Consumer {
  /**
   *
   * @param message
   * @param cb
   */
  consume (message, cb) {
    console.log(JSON.stringify(message))
    // TODO: write logic here
    cb()
  }
}

SaveDataToDBConsumer.queueName = REDIS_SMQ_BOOK_TTS_QUEUE
const consumer = new SaveDataToDBConsumer(config)
consumer.run()
