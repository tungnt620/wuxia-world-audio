const { BaseDB } = require('./BaseDB')
const adminStatements = require('./adminStatements')
const { getSlugFromString } = require('../utils')
const { ITEM_PER_PAGE } = require('../constants')

class AdminBookDB extends BaseDB {
  constructor (db) {
    super(db)
    this.setStatements(adminStatements)
  }

  getValueFromKey (key) {
    const data = this._getOne('get_value_from_key', { key })
    if (data) {
      return data.value
    }
    return undefined
  }

  saveKeyValue (key, value) {
    return this._run({ statementName: 'save_key_value', params: { key, value } })
  }

  getBook (source, source_id) {
    return this._getOne('get_book', { source, source_id })
  }

  getBookByID (id) {
    return this._getOne('get_book_by_id', { id })
  }

  getBooks (offset, limit = ITEM_PER_PAGE) {
    return this._getList('get_books', { offset, limit })
  }

  getTotalBooks () {
    return this._getOneWithPluck('get_total_book', {})
  }

  insertBook (bookData) {
    const today = (new Date()).toISOString()
    bookData.created_at = today
    bookData.updated_at = today
    bookData.slug = getSlugFromString(bookData.name)
    return this._run({ statementName: 'insert_book', params: bookData })
  }

  updateBook (bookData) {
    const { id, ...newData } = bookData
    bookData.updated_at = (new Date()).toISOString()

    let setValueStm = ''
    Object.keys(newData).forEach((fieldName) => {
      setValueStm += ` ${fieldName}=$${fieldName},`
    })
    if (setValueStm.endsWith(',')) {
      setValueStm = setValueStm.substring(0, setValueStm.length - 1)
    }
    const statement = `update book set ${setValueStm} where id=$id`

    return this._run({ statement, params: bookData })
  }

  getAuthorByName (name) {
    return this._getOne('get_author_by_name', { name })
  }

  insertAuthor (authorData) {
    return this._run({ statementName: 'insert_author', params: authorData })
  }

  getOrCreateAuthor (authorName) {
    const today = (new Date()).toISOString()

    let author = this.getAuthorByName(authorName)
    if (!author) {
      const authorData = {
        name: authorName,
        slug: getSlugFromString(authorName),
        created_at: today,
        updated_at: today,
      }
      this.insertAuthor(authorData)
      author = this.getAuthorByName(authorName)
    }

    return author
  }

  getCatByName (name) {
    return this._getOne('get_cat_by_name', { name })
  }

  insertCat (authorData) {
    return this._run({ statementName: 'insert_cat', params: authorData })
  }

  getOrCreateCat (catName) {
    const today = (new Date()).toISOString()

    let cat = this.getCatByName(catName)
    if (!cat) {
      const catData = {
        name: catName,
        slug: getSlugFromString(catName),
        created_at: today,
        updated_at: today,
      }
      this.insertCat(catData)
      cat = this.getCatByName(catName)
    }

    return cat
  }

  insertIfNotExistBookAuthor (book_id, author_id) {
    return this._run({ statementName: 'insert_if_not_exist_book_author', params: { book_id, author_id } })
  }

  insertIfNotExistBookCat (book_id, cat_id) {
    return this._run({ statementName: 'insert_if_not_exist_book_cat', params: { book_id, cat_id } })
  }

  insertIfNotExistBookChapter (book_id, chapter_id) {
    return this._run({ statementName: 'insert_if_not_exist_book_chapter', params: { book_id, chapter_id } })
  }
}

module.exports = {
  AdminBookDB
}
