const express = require("express");
const router = express.Router();

const db = require("../db");

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const updatedFields = req.body;

  if (!id || !updatedFields) {
    return res.status(400).json({ message: "ID and updatedFields error" });
  }

  const sql = "UPDATE complains SET ? WHERE id = ?";

  db.query(sql, [updatedFields, id], (err, result) => {
    if (err) {
      console.error("Error updating complaint:", err);
      return res.status(500).send("Error updating complaint");
    }
    console.log("Complaint updated successfully");
    res.status(200).send("Success");
  });
});

module.exports = router;
