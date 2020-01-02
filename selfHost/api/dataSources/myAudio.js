const { DataSource } = require('apollo-datasource')

statements = {
  'get_confession': 'select * from confession order by id desc limit $limit offset $offset',
  'get_confession_by_id': 'select * from confession where id=$id',
  'get_confession_by_slug': 'select * from confession where slug=$slug',
  'get_confession_by_category': `select * from confession where id in (
          select confession_id from confession_category where category_id=$categoryID order by confession_id desc limit $limit offset $offset
        )`,
  'get_confession_by_categorySlug': `select * from confession where id in (
          select confession_id 
          from confession_category 
          where category_id in ( select id from category where slug=$categorySlug)
          order by confession_id desc limit $limit offset $offset
        )`,
  'get_relative_confessions': `select * from confession where id in (
          select confession_id 
          from confession_category 
          where category_id in ($categoryIDsStr) and confession_id < $confessionID
          order by confession_id desc limit $limit
        )`,
  'get_total_comment_of_a_confession_id': `select count(*) from comment where confession_id=$confessionID`,
  'get_comment_by_confession_id': `select * from comment where confession_id=$confessionID order by id desc`,
  'get_category_by_slug': `select * from category where slug=$slug`,
  'get_categories': `select * from category order by id limit $limit offset $offset`,
  'get_categories_by_confession': `select * from category where id in (
          select category_id from confession_category where confession_id=$confessionID order by category_id desc
        )`,
  'get_relative_categories_by_confession': `select * from category where id not in (
          select category_id from confession_category where confession_id=$confessionID
        ) order by id desc limit $limit`,
  'search_confession': `
          select co.id, cs.title, cs.content, co.created_at, co.updated_at, co.slug, co.image from 
          (
            SELECT rowid, highlight(confession_search, 0, '<b>', '</b>') title,  highlight(confession_search, 1, '<b>', '</b>') content 
            FROM confession_search WHERE confession_search MATCH $matchExpressions ORDER BY rank limit $limit OFFSET $offset
          ) cs
          inner join confession co on cs.rowid = co.id
        `,
  'get_all_confession_slug': `select slug from confession`,
  'get_all_category_slug': `select slug from category`,
}

class ConfessionDB extends DataSource {

  constructor (db) {
    super()
    this.db = db
    // Enable WAL mode, for better concurrency
    // In this mode, transaction not correct in multiple database ( attach )
    this.db.pragma('journal_mode = WAL')
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize (config) {
    this.context = config.context
  }

  _getList (statementName, params) {
    // return [] array if no data. if error raise Error exception
    return this.db.prepare(statements[statementName]).all(params || {})
  }

  _getOne (statementName, params) {
    // return undefined if no data. if error raise Error exception
    return this.db.prepare(statements[statementName]).get(params || {})
  }

  _getOneWithPluck (statementName, params) {
    // return undefined if no data. if error raise Error exception
    // Return first column value
    return this.db.prepare(statements[statementName]).pluck().get(params || {})
  }

  async getConfessions ({ offset, limit, categoryID, categorySlug }) {
    let statementName = 'get_confession'
    let params = { limit, offset }
    if (categoryID) {
      statementName = 'get_confession_by_category'
      params = { ...params, categoryID }
    } else if (categorySlug) {
      statementName = 'get_confession_by_categorySlug'
      params = { ...params, categorySlug }
    }
    return this._getList(statementName, params)
  }

  async searchConfession ({ offset, limit, q }) {
    if (q) {
      let statementName = 'search_confession'
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

  async getConfessionDetail (id, slug) {
    if (id) {
      return this._getOne('get_confession_by_id', { id })
    } else if (slug) {
      return this._getOne('get_confession_by_slug', { slug })
    }
    return {}
  }

  async getTotalCommentByConfessionID (confessionID) {
    return this._getOneWithPluck('get_total_comment_of_a_confession_id', { confessionID })
  }

  async getCategoryBySlug (slug) {
    return this._getOne('get_category_by_slug', { slug })
  }

  async getCategories (offset, limit) {
    return this._getList('get_categories', { limit, offset })
  }

  async getCommentsByConfessionID (confessionID) {
    return this._getList('get_comment_by_confession_id', { confessionID })
  }

  async getCategoriesByConfessionID (confessionID) {
    return this._getList('get_categories_by_confession', { confessionID })
  }

  async getRelativeCategoriesByConfessionID (confessionID) {
    return this._getList('get_relative_categories_by_confession', { confessionID, limit: 5 })
  }

  async getAllConfessionSlug () {
    return this._getList('get_all_confession_slug')
  }

  async getAllCategorySlug () {
    return this._getList('get_all_category_slug')
  }

  async getRelativeConfessions (confession) {
    const categories = await this.getCategoriesByConfessionID(confession.id)
    const categoryIDsStr = categories.map(cat => cat.id).join(', ') || '0'
    return this._getList('get_relative_confessions', { confessionID: confession.id, categoryIDsStr, limit: 5 })
  }
}

module.exports = ConfessionDB
