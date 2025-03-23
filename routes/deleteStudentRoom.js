const express = require("express");
const router = express.Router();
const db = require("../db");

router.put("/:id_room", (req, res) => {
  const { id_room } = req.params;
  const { student_name } = req.body;

  const query = `
    UPDATE students
    SET id_room = null
     WHERE id_room = ? AND CONCAT(name, ' ', surname) = ?
  `;

  db.query(query, [id_room, student_name], (error, result) => {
    if (error) {
      console.error("Eroare la actualizarea camerei:", error);
      return res.status(500).json({ message: "Eroare internă la server" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Studentul nu a fost gasit" });
    }

    res.status(200).json({ message: "Succes" });
  });
});

module.exports = router;
