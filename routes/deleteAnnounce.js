const express = require("express");
const router = express.Router();

const db = require("../db");

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM announcements WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Eroare la ștergerea din baza de date:", err);
      res.status(500).send("Eroare la ștergere");
      return;
    }
    if (result.affectedRows > 0) {
      res.status(200).send("Element șters cu succes");
    } else {
      res.status(404).send("Elementul nu există sau nu a fost găsit");
    }
  });
});

module.exports = router;
