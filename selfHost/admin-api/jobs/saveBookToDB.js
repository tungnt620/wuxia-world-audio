const { AdminBookDB } = require('../dataSources/DB')
const Database = require('better-sqlite3')
const redis = require('redis')
const { LAST_ID_BOOK_STREAM_KEY } = require('../constants')
const { REDIS_STREAM_KEY_BOOK } = require('../constants')
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
  let lastID = await adminBookDB.getValueFromKey(LAST_ID_BOOK_STREAM_KEY)
  console.log('last id in stream is: ', lastID)
  if (!lastID) lastID = '$'

  client.send_command(
    'XREAD',
    ['BLOCK', 0, 'STREAMS', REDIS_STREAM_KEY_BOOK, lastID],
    async (err, data) => {
      if (!err) {
        try {
          console.log('Get data from stream: ')

          lastID = data[0][1][0][0]
          console.log(lastID)

          await adminBookDB.saveKeyValue(LAST_ID_BOOK_STREAM_KEY, lastID)
          const bookData = JSON.parse(data[0][1][0][1][1])

          const { author: authorName, cats: catNames, ...newBookData } = bookData

          bookDB.updateBook(newBookData)
          const book = bookDB.getBookByID(newBookData.id)

          const author = bookDB.getOrCreateAuthor(authorName)
          bookDB.insertIfNotExistBookAuthor(book.id, author.id)

          JSON.parse(catNames).forEach((catName) => {
            const cat = bookDB.getOrCreateCat(catName)
            bookDB.insertIfNotExistBookCat(book.id, cat.id)
          })

          console.log('insert data success')
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
