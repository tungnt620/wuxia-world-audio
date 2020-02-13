import book from '../../fe/pages/book'

const { AdminBookDB } = require('../dataSources/DB')
const Database = require('better-sqlite3')
const { getSlugFromString } = require('../utils')
const redis = require('redis')
const { LAST_ID_BOOK_STREAM_KEY } = require('../constants')
const { REDIS_STREAM_KEY_BOOK } = require('../constants')
const { LAST_ID_NEW_BOOKS_STREAM_KEY } = require('../constants')
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
        console.log('Get data from stream: ')

        lastID = data[0][1][0][0]

        await adminBookDB.saveKeyValue(LAST_ID_NEW_BOOKS_STREAM_KEY, lastID)
        const bookData = JSON.parse(data[0][1][0][1][1])
        console.log(bookData)

        const { author: authorName, cats: catNames, ...newBookData } = bookData

        bookDB.updateBook(newBookData)
        const book = bookDB.getBookByID(newBookData.id)

        const author = bookDB.getOrCreateAuthor(authorName)

        const cats = []
        catNames.forEach((catName) => {
          const cat = bookDB.getOrCreateCat(catName)
          cats.push(cat)
        })




        if (!isProcessShutDown) {
          await saveBookToDB()
        }
      }
    }
  )
}

module.exports = saveBookToDB
