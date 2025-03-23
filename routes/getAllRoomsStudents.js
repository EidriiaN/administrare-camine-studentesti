const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const sql = `SELECT * FROM students where id_room IS null`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error getAllRoomsStudents", err);
      res.status(500).send("Error getAllRoomsStudents");
      return;
    }
    res.status(200).json(result);
  });
});

module.exports = router;
