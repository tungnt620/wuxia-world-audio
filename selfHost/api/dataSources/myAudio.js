const { BaseDB } = require('./BaseDB')
const { myAudioStatements } = require('./myAudioStatements')

class BookDB extends BaseDB {
  constructor (db) {
    super(db)
    this.setStatements(myAudioStatements)
  }

  async getBook (slug) {
    if (slug) {
      return this._getOne('get_book_by_slug', { slug })
    }
    return {}
  }

  async getBooks ({ offset, limit, catID, catSlug }) {
    let statementName
    let params = { limit, offset }
    if (catID) {
      statementName = 'get_book_by_cat_id'
      params = { ...params, catID }
    } else if (catSlug) {
      statementName = 'get_book_by_cat_slug'
      params = { ...params, catSlug }
    }
    return this._getList(statementName, params)
  }

  async searchBook ({ offset, limit, q }) {
    if (q) {
      let statementName = 'search_book'
      const words = q.split(' ')
      let matchExpressions = `${q}`
      let temp = words[0]
      for (let i = 1; i < words.length; i++) {
        temp += ` ${words[i]}`
        matchExpressions += ` OR "${temp}"`
      }
      const params = { limit, offset, matchExpressions }
      return this._getList(statementName, params)
    }
  }

  async getCatBySlug (slug) {
    return this._getOne('get_cat_by_slug', { slug })
  }

  async getCats (offset, limit) {
    return this._getList('get_cats', { limit, offset })
  }
}

module.exports = BookDB
