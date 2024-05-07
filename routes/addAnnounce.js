const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
  const announceData = req.body;
  const author = `${req.session.adminData.firstName} ${req.session.adminData.lastName}`;
  announceData.author = author;

  console.log(announceData);

  const sql = "INSERT INTO Announcements SET ?";

  db.query(sql, announceData, (err, result) => {
    if (err) {
      console.error("Eroare la inserarea anunțului:", err);
      res.status(500).send("Eroare la inserarea anunțului");
      return;
    }
    console.log("Anunțul a fost inserat cu succes:", result);
    res.status(200).send("Anunțul a fost inserat cu succes");
  });
});

module.exports = router;
