const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session.loggedIn, "in cerere");
  if (req.session && req.session.loggedIn === true) {
    res.sendStatus(200);
  } else {
    res.sendStatus(201);
  }
});

module.exports = router;
