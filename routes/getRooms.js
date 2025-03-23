const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const sql = `SELECT 
  r.id_room,
  r.room_number,
  r.floor,
  r.room_capacity,
  r.last_renovation,
  COUNT(s.id) AS students_in_room,
  (r.room_capacity - COUNT(s.id)) AS free_beds,
  JSON_ARRAYAGG(
      JSON_OBJECT('name', CONCAT(s.name, ' ', s.surname))
  ) AS students
  FROM 
  dorm_room r
  LEFT JOIN 
  students s ON r.id_room = s.id_room
  GROUP BY 
  r.id_room, r.room_number, r.floor, r.room_capacity;
    `;

  db.query(sql, req.session.userData.studentId, (err, result) => {
    if (err) {
      console.error("Eroare getComplains", err);
      res.status(500).send("Eroare");
      return;
    }
	const transformedResult = result.map((row) => ({
	  ...row,
	  students: typeof row.students === "string" ? JSON.parse(row.students) : row.students,
	}));

    res.status(200).json(transformedResult);
  });
});

module.exports = router;
