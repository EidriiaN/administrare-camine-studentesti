// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   if (req.session && req.session.loggedIn === true && req.session.userData && req.session.userData.role) {
//     // Utilizatorul este autentificat și există informații de utilizator în sesiune
//     if (req.session.userData.role === "admin") {
//       res.status(200).send("admin");
//     } else {
//       res.status(200).send("student");
//     }
//   } else {
//     // Utilizatorul nu este autentificat sau nu există informații de utilizator în sesiune
//     res.status(201).send("Utilizatorul nu este autentificat.");
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (
    req.session &&
    req.session.loggedIn === true &&
    req.session.userData &&
    req.session.userData.role
  ) {
    // Utilizatorul este autentificat și există informații de utilizator în sesiune
    if (req.session.userData.role === "admin") {
      res.status(200).send("admin");
    } else {
      res.status(200).send("student");
    }
  } else {
    // Utilizatorul nu este autentificat sau nu există informații de utilizator în sesiune
    res.status(201).send("Utilizatorul nu este autentificat.");
  }
});

module.exports = router;
