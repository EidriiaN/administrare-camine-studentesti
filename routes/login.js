const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  const sql = `
    SELECT u.id_user, u.role, u.email, u.password,
           s.id AS studentId, a.id_admin AS adminId
    FROM users u
    LEFT JOIN students s ON s.id_user = u.id_user
    LEFT JOIN admins a ON a.id_user = u.id_user
    WHERE u.email = ? AND u.password = ?
  `;

  db.query(sql, [email, pass], (err, result) => {
    if (err) {
      console.error("Eroare la logare:", err);
      res.sendStatus(500); // Server Error
      return;
    }

    if (result.length > 0) {
      req.session.loggedIn = true;
      const userData = {
        userId: result[0].id_user,
        role: result[0].role,
        studentId: result[0].studentId,
        adminId: result[0].adminId,
      };
      req.session.userData = userData;
      console.log("userData setat cu succes în ruta de login:", userData);
      console.log("Sesiune:", req.session);
      res.status(200).json({ status: 200, userData: userData });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
