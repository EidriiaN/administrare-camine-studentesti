const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT urgency, COUNT(*) AS count FROM complains GROUP BY urgency;";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error backend:", err);
      res.status(500).send("Error backend");
      return;
    }
    res.status(200).json(result);
  });
});

module.exports = router;
