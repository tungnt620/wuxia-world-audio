const { BaseDB } = require('./BaseDB')
const adminStatements = require('./adminStatements')

class AdminBookDB extends BaseDB {
  constructor (db) {
    super(db)
    this.setStatements(adminStatements)
  }

  async getValueFromKey (key) {
    return this._getOneWithPluck('get_value_from_key', { key })
  }
}

module.exports = {
  AdminBookDB
}
