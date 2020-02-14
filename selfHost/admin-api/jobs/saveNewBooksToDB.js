const { REDIS_STREAM_KEY_NEW_BOOKS } = require('../constants')
const { AdminBookDB } = require('../dataSources/DB')
const Database = require('better-sqlite3')
const redis = require('redis')
const { LAST_ID_NEW_BOOKS_STREAM_KEY } = require('../constants')
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
})

const adminBookDB = new AdminBookDB(new Database(process.env.DB_URL))
const bookDB = new AdminBookDB(new Database(process.env.MY_AUDIO_DB_URL))

let { isProcessShutDown } = require('./index')

client.on('error', function (error) {
  console.error(error)
})

async function saveNewBooksToDB () {
  let lastID = await adminBookDB.getValueFromKey(LAST_ID_NEW_BOOKS_STREAM_KEY)
  console.log('last id in stream is: ', lastID)
  if (!lastID) lastID = '$'

  client.send_command(
    'XREAD',
    ['BLOCK', 0, 'STREAMS', REDIS_STREAM_KEY_NEW_BOOKS, lastID],
    async (err, data) => {
      if (!err) {
        try {
          console.log('Get data from stream: ')

          lastID = data[0][1][0][0]
          await adminBookDB.saveKeyValue(LAST_ID_NEW_BOOKS_STREAM_KEY, lastID)
          const newBooks = JSON.parse(data[0][1][0][1][1])
          newBooks.forEach((book) => {
            const bookData = bookDB.getBook(book.source, book.source_id)
            console.log('is book exists: ' + !!bookData)
            if (!bookData) {
              const insertResult = bookDB.insertBook(book)
              console.log(insertResult)
            }
          })
        } catch (err) {
          console.log(err)
        }

        if (!isProcessShutDown) {
          await saveNewBooksToDB()
        }
      }
    }
  )
}

module.exports = saveNewBooksToDB
