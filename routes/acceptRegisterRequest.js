const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const db = require("../db");

router.post("/", (req, res) => {
  const generatePassword = (cnp) => {
    const lastSixDigits = cnp.slice(-6);
    const fixedPart = "Xyz";
    return `${fixedPart}${lastSixDigits}%`;
  };

  const insertAccountData = async (email, password, register_date) => {
    try {
      // const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword = password;

      const insertResult = await new Promise((resolve, reject) => {
        db.query("INSERT INTO users (email, password, register_date) VALUES (?, ?, ?)", [email, hashedPassword, register_date], (err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      const id_user = insertResult.insertId;
      console.log("Datele contului au fost inserate cu succes în tabela users.");
      return id_user;
    } catch (error) {
      console.error("Eroare la inserarea datelor în tabela accounts:", error);
      throw error;
    }
  };

  const sendNotificationEmail = async (studentData, password) => {
    try {
      const transporter = nodemailer.createTransport({
        // Configurațiile transportului SMTP sau alt protocol de trimitere a email-urilor
        // Exemplu pentru Gmail:
        service: "gmail",
        auth: {
          user: "adispikero@gmail.com",
          pass: "adct kylq xvbs ivdf",
        },
      });

      const mailOptions = {
        from: "adispikero@gmail.com",
        to: studentData.email,
        subject: "UPG Camin: Cererea ta a fost acceptată!",
        html: `
          <p>Bună ${studentData.name} ${studentData.surname},</p>
          <p>Te felicităm! Cererea ta pentru cazare la Caminul ${studentData.dormPreference} UPG a fost acceptată!</p>
          <p>Acum poți accesa contul tău folosind următoarele informații:</p>
          <ul>
            <li><strong>Email:</strong> ${studentData.email}</li>
            <li><strong>Parolă:</strong> ${password}</li>
          </ul>
          <p>Te rugăm să-ți verifici detaliile și să iei toate măsurile necesare pentru a-ți asigura o ședere confortabilă la UPG.</p>
          <p>Cu drag,</p>
          <p>Administratia Caminului ${studentData.dormPreference} UPG</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email de notificare trimis cu succes.");
    } catch (error) {
      console.error("Eroare la trimiterea email-ului de notificare:", error);
    }
  };

  try {
    const studentData = { ...req.body };
    const studentId = studentData.id;
    const register_date = studentData.register_date;
    delete studentData.id;
    delete studentData.status;
    delete studentData.register_date;

    const password = generatePassword(studentData.cnp);
    insertAccountData(studentData.email, password, register_date).then((result) => {
      studentData.id_user = result;
      sendNotificationEmail(studentData, password);

      db.query("INSERT INTO students SET ?", studentData);

      const requestUpdateResult = db.query("UPDATE requests_for_approval SET status = 1 WHERE id = ?", studentId);

      if (requestUpdateResult.affectedRows === 0) {
        console.error("Nu s-a găsit cererea de aprobare asociată cu acest student.");
        return res.status(404).json({ error: "Nu s-a găsit cererea de aprobare asociată cu acest student." });
      }

      res.status(200).json({ message: "Contul a fost înregistrat cu succes." });
    });
  } catch (error) {
    console.error("Eroare la procesarea cererii:", error);
    res.status(500).json({ error: "A apărut o eroare la procesarea cererii." });
  }
});

module.exports = router;
