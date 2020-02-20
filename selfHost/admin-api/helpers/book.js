const { AdminBookDB } = require('../dataSources/DB')
const { getResponse } = require('./request')
const Database = require('better-sqlite3')
const { API_CODE_ERROR } = require('../constants')
const { ITEM_PER_PAGE } = require('../constants')

const bookDB = new AdminBookDB(new Database(process.env.MY_AUDIO_DB_URL))

async function getBooks ({ page = 1, sorter = '{}', filter = '{}'}) {
  const offset = (page - 1) * ITEM_PER_PAGE

  filter = JSON.parse(filter)
  sorter = JSON.parse(sorter)

  try {
    const books = bookDB.getBooks({
      offset,
      nameSearchText: filter.name,
      sortBy: sorter.field,
      sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc'
    })
    const totalBook = bookDB.getTotalBooks()

    return getResponse({
      data: {
        items: books,
        total: totalBook
      }
    })
  } catch (err) {
    console.log(err)
    return getResponse({ code: API_CODE_ERROR, error: err.toString() })
  }
}

async function getBook (id) {
  try {
    const book = bookDB.getBookByID(id)
    return getResponse({ data: book })
  } catch (err) {
    console.log(err)
    return getResponse({ code: API_CODE_ERROR, error: err.toString() })
  }
}

async function updateBook (id, newData) {
  try {
    bookDB.updateTable('book', { id, ...newData })
    return getResponse()
  } catch (err) {
    console.log(err)
    return getResponse({ code: API_CODE_ERROR, error: err.toString() })
  }
}

module.exports = {
  getBooks,
  getBook,
  updateBook,
}
