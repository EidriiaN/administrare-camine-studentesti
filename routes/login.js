const express = require("express");
const router = express.Router();

// Create a connection to the database
const db = require("../db"); // Import the database connection

router.post("/", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  db.query(
    "SELECT u.email, a.parola from users u JOIN accounts a ON u.id = a.id_utilizator WHERE u.email LIKE ? AND a.parola LIKE ?",
    [email, pass],
    (err, result) => {
      if (err) {
        console.log(err, "error");
      } else {
        if (result.length > 0) {
          req.session.loggedIn = true;
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      }
    }
  );
});

module.exports = router;
