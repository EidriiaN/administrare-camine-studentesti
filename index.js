require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const PORT = 3000;

// Middleware configurations
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 12 * 60 * 60 * 1000,
      secure: false,
    },
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:19006", "https://localhost:19006"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  })
);

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Open the MySQL connection
connection.connect((error) => {
  if (error) {
    console.log("An error has occurred while connecting to the database.");
    throw error;
  }

  // If everything goes correct, then start Express Server
  app.listen(PORT, () => {
    console.log(
      "Database connection is ready, and the server is listening on Port ",
      PORT
    );
  });
});

// Route handler
app.post("/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const email = req.body.email;
  const pass = req.body.password;

  connection.query(
    "SELECT u.email, a.parola from users u JOIN accounts a ON u.id = a.id_utilizator WHERE u.email LIKE ? AND a.parola LIKE ?",
    [email, pass],
    (err, result) => {
      if (err) {
        console.log(err, "error");
      } else {
        if (result.length > 0) {
          console.log(result.length, "logged in");
          console.log(req.session.loggedIn);
          req.session.loggedIn = true;
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      }
    }
  );
});

// Additional route handlers can be added here

// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
