const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
  const complainData = {
    id_student: req.session.userData.studentId,
    ...req.body,
  };

  const sql = "INSERT INTO complains SET ?";

  db.query(sql, complainData, (err, result) => {
    if (err) {
      console.error("Eroare la inserarea reclamatiei:", err);
      res.status(500).send("Eroare la inserarea anunțului");
      return;
    }
    console.log("Reclamatia a fost inserat cu succes:");
    res.status(200).send("Succes");
  });
});

module.exports = router;
