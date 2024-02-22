const express = require("express");
const router = express.Router();

// Create a connection to the database
const db = require("../db"); // Import the database connection

router.post("/", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  db.query(
    "SELECT u.email, a.password from users u JOIN accounts a ON u.id_user = a.id_user WHERE u.email LIKE ? AND a.password LIKE ?",
    [email, pass],
    (err, result) => {
      if (err) {
        console.log(err, "error");
        res.sendStatus(500); // Server Error
      } else {
        if (result.length > 0) {
          req.session.loggedIn = true;
          console.log(req.session.loggedIn, "loggin console");
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      }
    }
  );
});

module.exports = router;
