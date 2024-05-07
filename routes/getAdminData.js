const express = require("express");
const router = express.Router();

// Create a connection to the database
const db = require("../db"); // Import the database connection

router.get("/", (req, res) => {
  const id = req.session.userData.userId;

  db.query("SELECT a.first_name, a.last_name, d.dorm_number, d.dorm_capacity from admins a JOIN dorms d ON a.id_admin = d.admin WHERE a.id_user LIKE ? ", [id], (err, result) => {
    if (err) {
      console.log(err, "error");
      res.sendStatus(500); // Server Error
    } else {
      if (result.length > 0) {
        const userData = {
          firstName: result[0].first_name,
          lastName: result[0].last_name,
          dormNumber: result[0].dorm_number,
          dormCapacity: result[0].dorm_capacity,
        };
        req.session.adminData = {
          firstName: userData.firstName,
          lastName: userData.lastName,
        };
        console.log(userData);
        res.json(userData);
      } else {
        res.sendStatus(404);
      }
    }
  });
});

module.exports = router;
