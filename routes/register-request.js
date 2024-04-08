const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
  const formData = req.body;

  db.query("INSERT INTO requests_for_approval SET ?", formData, (error, result) => {
    if (error) {
      console.error("Eroare la inserarea cererii în baza de date:", error);
      res.status(500).json({ error: "A apărut o eroare la procesarea cererii." });
    } else {
      res.status(200).json({ message: "Cererea de înregistrare a fost trimisă cu succes." });
    }
  });
});

module.exports = router;
