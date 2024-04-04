const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session && req.session.userData) {
    res.json(req.session.userData);
    console.log(req.session.userData, "dasta");
  } else {
    res.status(500);
  }
});

module.exports = router;
