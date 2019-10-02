const sqlite3 = require('sqlite3').verbose();

/**
 * Generate sqlite database
 */
const DB = new sqlite3.Database('./db/furniture_store.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  createShopTables(DB);
  console.log('Connected to furniture store database.');
});

/**
 * Create clients table
 */
const createShopTables = (DB) => {
  DB.run(`CREATE TABLE IF NOT EXISTS users
          (
              id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
              first_name  VARCHAR(60),
              last_name   VARCHAR(60),
              email       VARCHAR(60),
              password    VARCHAR(80),
              currency    VARCHAR(10),
              role        VARCHAR(20) DEFAULT 'user',
              createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP
          )`);
  DB.run(`CREATE TABLE IF NOT EXISTS products
          (
              id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
              title       VARCHAR(60),
              category    VARCHAR(60),
              price       REAL,
              image       TEXT,
              description TEXT,
              createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP
          )`);
  DB.run(`CREATE TABLE IF NOT EXISTS categories
          (
              id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
              title       VARCHAR(60),
              createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP
          )`);
};

/**
 *
 * @type {{db: exports.cached.Database}}
 */
module.exports = DB;
