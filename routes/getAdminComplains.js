const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const sql = `
  SELECT complains.*, students.name, students.surname, dorm_room.room_number
  FROM complains
  INNER JOIN students ON complains.id_student = students.id
  INNER JOIN dorm_room ON students.id_room = dorm_room.id_room
  ORDER BY complains.report_date DESC
`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Eroare getComplains", err);
      res.status(500).send("Eroare");
      return;
    }
    res.status(200).json(result);
  });
});

module.exports = router;
