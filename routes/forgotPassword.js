const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const db = require("../db");

router.post("/", (req, res) => {
  const email = req.body.email;
  const sendNotificationEmail = async (email) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "adispikero@gmail.com",
          pass: "adct kylq xvbs ivdf",
        },
      });

      const mailOptions = {
        from: "adispikero@gmail.com",
        to: email,
        subject: "UPG Camin: Am uitat parola",
        html: `
          <p>Salutare,</p>
          <p>Ai primit acest mail deoarece ai uitat parola contului pentru platforma MyCampus!</p>
          <p>Poți accesa contul tău folosind următoarele informații:</p>
          <ul>
            <li><strong>Instrucțiuni:</strong> Parola ta este de forma: </li>
            <li><strong>Parolă:</strong> Xyz[ultimele 6 numere din CNP]% </li>
            <li><strong>Exemplu:</strong> Xyz203126% </li>
          </ul>
          <p>Cu drag,</p>
          <p>Administratia Caminului UPG</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email de notificare trimis cu succes.");
      res.status(200).send("Succes");
    } catch (error) {
      console.error("Eroare la trimiterea email-ului de notificare:", error);
      res.status(500).send("Eroare trimitere mail.");
    }
  };
  sendNotificationEmail(email);
});

module.exports = router;
