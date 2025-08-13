const mysql = require("mysql2/promise");
require("dotenv").config();
async function runQuery(query, params = []) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectTimeout: 60000,
  });

  const [rows] = await connection.execute(query, params);
  await connection.end();
  return rows;
}

module.exports = { runQuery };
