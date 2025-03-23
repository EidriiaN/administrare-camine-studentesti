const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.clearCookie("connect.sid");
    return res.status(200).send("Logged out successfully");
  });
});

module.exports = router;
