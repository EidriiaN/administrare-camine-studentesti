const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const id_student = req.session.userData.studentId;
  const sql = `SELECT c.*, s.name, s.surname , r.room_number
            FROM complains c 
            LEFT JOIN students s on c.id_student = s.id
            LEFT JOIN dorm_room r on r.id_room = s.id_room
            WHERE id_student = ? ORDER BY report_date DESC`;

  db.query(sql, [id_student], (err, result) => {
    if (err) {
      console.error("Eroare getComplains", err);
      res.status(500).send("Eroare");
      return;
    }
    res.status(200).json(result);
  });
});

module.exports = router;
