const { AdminBookDB } = require('../dataSources/DB')
const Database = require('better-sqlite3')
const redis = require('redis')
const { REDIS_STREAM_KEY_CHAPTER } = require('../constants')
const { LAST_ID_CHAPTER_STREAM_KEY } = require('../constants')
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
})

const adminBookDB = new AdminBookDB(new Database(process.env.DB_URL))
const bookDB = new AdminBookDB(new Database(process.env.MY_AUDIO_DB_URL))

let isProcessShutDown = false
module.exports.isProcessShutDown = isProcessShutDown

client.on('error', function (error) {
  console.error(error)
})

async function saveBookToDB () {
  let lastID = await adminBookDB.getValueFromKey(LAST_ID_CHAPTER_STREAM_KEY)
  console.log('last id in stream is: ', lastID)
  if (!lastID) lastID = '$'

  client.send_command(
    'XREAD',
    ['BLOCK', 0, 'STREAMS', REDIS_STREAM_KEY_CHAPTER, lastID],
    async (err, data) => {
      if (!err) {
        try {
          console.log('Get data from stream: ')

          lastID = data[0][1][0][0]

          await adminBookDB.saveKeyValue(LAST_ID_CHAPTER_STREAM_KEY, lastID)
          const chapterCrawlData = JSON.parse(data[0][1][0][1][1])

          const { book_id, ...chapterData } = chapterCrawlData
          bookDB.deleteChapterByBookIDAndOrderNo(book_id, chapterData.order_no)
          const { lastInsertRowid } = bookDB.insertChapter(chapterData)
          bookDB.insertIfNotExistBookChapter(book_id, lastInsertRowid)

          console.log('save data success')
        } catch (err) {
          console.log(err)
        }

        if (!isProcessShutDown) {
          await saveBookToDB()
        }
      }
    }
  )
}

module.exports = saveBookToDB
