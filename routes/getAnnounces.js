const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM announcements ORDER BY publication_date DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Eroare la inserarea anunțului:", err);
      res.status(500).send("Eroare la inserarea anunțului");
      return;
    }
    console.log("Anunțul a fost inserat cu succes:", result);
    res.status(200).json(result);
  });
});

module.exports = router;
