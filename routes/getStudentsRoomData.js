const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/:id_room", (req, res) => {
  const id_room = req.params.id_room;
  const sql = "SELECT * FROM students WHERE id_room = ?";

  db.query(sql, id_room, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Error");
      return;
    }
    res.status(200).json(result);
  });
});

module.exports = router;
