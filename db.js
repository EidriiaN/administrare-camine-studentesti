// db.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) {
    console.log("An error has occurred while connecting to the database.");
    throw error;
  }
  console.log("Database connected successfully!");
});

module.exports = connection;
