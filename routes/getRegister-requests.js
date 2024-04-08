const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
  db.query("SELECT * from requests_for_approval where status like 'pending'", (error, result) => {
    if (error) {
      console.error("Eroare la inserarea cererii în baza de date:", error);
      res.status(500).json({ error: "A apărut o eroare la procesarea cererii." });
    } else {
      const data = result;
      res.status(200).json(data);
    }
  });
});

module.exports = router;
