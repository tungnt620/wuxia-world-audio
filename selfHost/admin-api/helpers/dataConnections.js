const { AdminBookDB } = require("../dataSources/DB");
const Database = require("better-sqlite3");
const redis = require("redis");

exports.redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

exports.bookDB = new AdminBookDB(new Database(process.env.CORE_DB_URL));
exports.adminBookDB = new AdminBookDB(new Database(process.env.DB_URL));
