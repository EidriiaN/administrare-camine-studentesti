const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
  let parkingData = req.body;

  let sql = `SELECT CONCAT(s.name, ' ', s.surname) AS full_name, s.faculty, s.studyProgram, s.studyYear, s.group_number, s.phoneNumber, d.dorm_number, r.room_number
    FROM students s
    JOIN dorm_room r ON r.id_room = s.id_room
    JOIN dorms d ON d.dorm_id = r.dorm_id
    WHERE s.id = ?;
    `;

  db.query(sql, req.session.userData.studentId, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Error");
      return;
    }

    parkingData = { id_student: req.session.userData.studentId, ...parkingData, ...result[0] };

    sql = "INSERT INTO parking_requests SET ?";

    db.query(sql, parkingData, (err, result) => {
      if (err) {
        console.error("Erroar", err);
        res.status(500).send("Error");
        return;
      }
      console.log("Succes");
      res.status(200).send("Succes");
    });
  });
});

module.exports = router;
