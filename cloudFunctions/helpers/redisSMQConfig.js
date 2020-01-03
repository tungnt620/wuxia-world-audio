
// const { Message, Producer } = require('redis-smq');

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


// const producer = new Producer('story-tts', config);
// const message = new Message();
// message
//   .setBody({
//     tung: 'nguyen'
//   })
//   .setTTL(60 * 60 * 1000)
//
// producer.produceMessage(message, (err) => {
//   if (err) console.log('Push story crawl data to queue failed', err);
//   else console.log('Successfully push story crawl data to queue')
//   producer.shutdown();
// });
