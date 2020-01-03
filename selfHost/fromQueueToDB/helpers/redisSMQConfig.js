const { REDIS_SMQ_BOOK_TTS_QUEUE } = require('../share/constants')

const config = {
  namespace: 'book-tts',
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
module.exports = config

function testPushToQueue () {
  const { Message, Producer } = require('redis-smq')

  const producer = new Producer(REDIS_SMQ_BOOK_TTS_QUEUE, config)
  const message = new Message()
  message
    .setBody({
      name: 'tung',
      desc: 'nguyen',
      img: 'https://google.com/image.jpg',
      author: 'Tung nguyen',
      cat: 'tien hiep',
      chapter: {
        no: 1,
        name: 'chuong 1',
        text: 'sadsadsadsadsa sa d sa ds ads',
        audio: 'https://google.com/audio.mp3',
      },
      isOverrideIfBookExists: false,
    })
    .setTTL(60 * 60 * 1000)

  producer.produceMessage(message, (err) => {
    if (err) console.log('Push story crawl data to queue failed', err)
    else console.log('Successfully push story crawl data to queue')
    producer.shutdown()
  })
}

// testPushToQueue()
