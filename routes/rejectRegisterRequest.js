const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
  const studentId = req.body.id;

  db.query("UPDATE requests_for_approval SET status = 3 WHERE id = ?", studentId, (error, requestResult) => {
    if (error) {
      console.error("Eroare la actualizarea cererii în baza de date:", error);
      return res.status(500).json({ error: "A apărut o eroare la procesarea cererii." });
    }

    if (requestResult.affectedRows === 0) {
      console.error("Nu s-a găsit cererea de aprobare asociată cu acest student.");
      return res.status(404).json({ error: "Nu s-a găsit cererea de aprobare asociată cu acest student." });
    }

    res.status(200).json({ message: "Contul a fost respins cu succes." });
  });
});

module.exports = router;
