const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const sql = `SELECT 
            CONCAT(s.name, ' ', s.surname) AS full_name,
            d.dorm_number,
            d.dorm_president,
            r.room_number,
            r.floor,
            r.rent_price,
            r.last_renovation,
            CONCAT(a.first_name, ' ', a.last_name) AS admin_full_name,
            a.email,
            a.phone_number,
            (SELECT GROUP_CONCAT(CONCAT(s2.name, ' ', s2.surname) SEPARATOR ', ')
            FROM students s2
            WHERE s2.id_room = s.id_room AND s2.id != s.id) AS roommates
            FROM students s
            JOIN dorm_room r ON r.id_room = s.id_room
            JOIN dorms d ON d.dorm_id = r.dorm_id
            JOIN admins a ON a.id_admin = d.admin
            WHERE s.id = ?;
        `;

  db.query(sql, req.session.userData.studentId, (err, result) => {
    if (err) {
      console.error("Eroar getRoomData Backend:", err);
      res.status(500).send("Eroar getRoomData Backend:");
      return;
    }
    res.status(200).json(result[0]);
  });
});

module.exports = router;
