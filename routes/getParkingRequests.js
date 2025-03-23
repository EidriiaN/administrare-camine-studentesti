const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
  const sql = `
  SELECT * FROM parking_requests WHERE dorm_number=?
`;

  db.query(sql, req.session.adminData.dorm_number, (err, result) => {
    if (err) {
      console.error("Eroare getComplains", err);
      res.status(500).send("Eroare");
      return;
    }
    res.status(200).json(result);
  });
});

module.exports = router;
