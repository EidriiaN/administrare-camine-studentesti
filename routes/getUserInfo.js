const express = require("express");
const router = express.Router();

const db = require("../db");

// const sql = `
//     SELECT
//         SELECT students.name, students.surname, dorm_room.room_number from students JOIN dorm_room ON dorm_room.id_room = students.id_room WHERE students.id = ?,
//         (SELECT COUNT(*) FROM dorm_room) AS num_total_rooms,
//         (SELECT COUNT(*) FROM dorm_room LEFT JOIN students ON dorm_room.id_room = students.id_room WHERE students.id_room IS NULL) AS vacant_rooms,
//         (SELECT SUM(CASE WHEN num_students IS NULL THEN 3 ELSE 3 - num_students END) FROM (SELECT dr.id_room, COUNT(st.id) AS num_students FROM dorm_room dr LEFT JOIN students st ON dr.id_room = st.id_room GROUP BY dr.id_room) AS room_counts) AS total_vacant_slots
// `;

const sql = `
    SELECT 
        students.name, 
        students.surname, 
        dorm_room.room_number,
        (SELECT COUNT(*) FROM dorm_room) AS num_total_rooms,
        (SELECT COUNT(*) FROM dorm_room LEFT JOIN students ON dorm_room.id_room = students.id_room WHERE students.id_room IS NULL) AS vacant_rooms,
        (SELECT SUM(CASE WHEN num_students IS NULL THEN 3 ELSE 3 - num_students END) FROM (SELECT dr.id_room, COUNT(st.id) AS num_students FROM dorm_room dr LEFT JOIN students st ON dr.id_room = st.id_room GROUP BY dr.id_room) AS room_counts) AS total_vacant_slots
    FROM 
        students
    LEFT JOIN 
        dorm_room ON dorm_room.id_room = students.id_room 
    WHERE 
        students.id = ?
`;

router.get("/", (req, res) => {
  const id = req.session.userData.studentId;

  db.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const result = {
      name: results[0].name,
      surname: results[0].surname,
      room_number: results[0].room_number,
      num_total_rooms: results[0].num_total_rooms,
      free_rooms: results[0].vacant_rooms,
      total_free_slots: results[0].total_vacant_slots,
    };

    res.json(result);
  });
});

module.exports = router;
