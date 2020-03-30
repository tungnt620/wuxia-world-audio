class BaseDB {
  constructor(db) {
    this.db = db;
    this.statements = {};
    // Enable WAL mode, for better concurrency
    // In this mode, transaction not correct in multiple database ( attach )
    this.db.pragma("journal_mode = WAL");
  }

  setStatements(statements) {
    this.statements = statements;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  _getList(statementNameOrStatement, params) {
    // return [] array if no data. if error raise Error exception
    let statement;
    if (this.statements[statementNameOrStatement]) {
      statement = this.statements[statementNameOrStatement];
    } else {
      statement = statementNameOrStatement;
    }
    return this.db.prepare(statement).all(params || {});
  }

  _getOne(statementName, params) {
    // return undefined if no data. if error raise Error exception
    return this.db.prepare(this.statements[statementName]).get(params || {});
  }

  _getOneWithPluck(statementName, params) {
    // return undefined if no data. if error raise Error exception
    // Return first column value
    return this.db
      .prepare(this.statements[statementName])
      .pluck()
      .get(params || {});
  }
}

module.exports = {
  BaseDB
};
