const express = require("express");
const router = express.Router();
const db = require("../db");

router.put("/:id_room", (req, res) => {
  const { id_room } = req.params;
  const { room_capacity, last_renovation } = req.body;

  const query = `
    UPDATE dorm_room
    SET room_capacity = ?
    WHERE id_room = ?
  `;

  db.query(query, [room_capacity, id_room], (error, result) => {
    if (error) {
      console.error("Eroare la actualizarea camerei:", error);
      return res.status(500).json({ message: "Eroare internă la server" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Camera nu a fost găsită" });
    }

    res.status(200).json({ message: "Camera a fost actualizată cu succes" });
  });
});

module.exports = router;
