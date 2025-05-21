require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
  host:process.env.host,
  user:process.env.user,
  password:process.env.password,
  database:process.env.database,
  port:process.env.port
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
