require('dotenv').config()

const redisSMQ = require('redis-smq')
const Consumer = redisSMQ.Consumer

const config = {
  namespace: 'story-tts',
  redis: {
    driver: 'redis',
    options: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      connect_timeout: 3600000,
    },
  },
}

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

SaveDataToDBConsumer.queueName = 'story-tts'

const consumer = new SaveDataToDBConsumer(config)
console.log(consumer)
consumer.run()
