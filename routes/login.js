const express = require("express");
const router = express.Router();

// Create a connection to the database
const db = require("../db"); // Import the database connection

router.post("/", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  db.query(
    "SELECT u.id_user, u.role, u.email, a.password from users u JOIN accounts a ON u.id_user = a.id_user WHERE u.email LIKE ? AND a.password LIKE ?",
    [email, pass],
    (err, result) => {
      if (err) {
        console.log(err, "error");
        res.sendStatus(500); // Server Error
      } else {
        if (result.length > 0) {
          req.session.loggedIn = true;
          const userData = { userId: result[0].id_user, role: result[0].role };
          req.session.userData = userData;
          res.status(200).json({ status: 200, userData: userData });
        } else {
          res.sendStatus(404);
        }
      }
    }
  );
});

module.exports = router;
