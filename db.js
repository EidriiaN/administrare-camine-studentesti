// db.js
const mysql = require('mysql2');

// Creează un pool de conexiuni
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Host-ul bazei de date
  user: process.env.DB_USER, // Utilizatorul bazei de date
  password: process.env.DB_PASSWORD, // Parola bazei de date
  database: process.env.DB_DATABASE, // Numele bazei de date
  port: process.env.DB_PORT, // Portul bazei de date
  connectionLimit: 10, // Limita maximă de conexiuni simultane în pool
});

// Verifică conexiunea inițială
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Eroare la conectarea la baza de date:", err.code, err.message);
    return;
  }
  console.log("Conectat la baza de date!");
  connection.release(); // Eliberează conexiunea în pool
});

// Exportă pool-ul pentru a fi folosit în alte fișiere
module.exports = pool;
