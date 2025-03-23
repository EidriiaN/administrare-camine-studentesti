const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const db = require("../db");

const getEmail = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT s.email FROM students s JOIN parking_requests p ON s.id = p.id_student WHERE p.id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length > 0) {
        resolve(result[0].email);
      } else {
        resolve(null);
      }
    });
  });
};

const generateEmailContent = (status) => {
  let subject = "UPG Camin: Status Actualizat";
  let htmlContent = `
    <p>Salutare,</p>
    <p>Statusul cererii tale a fost actualizat.</p>
    <p>Cu drag,</p>
    <p>Administratia Caminului UPG</p>
  `;

  switch (status) {
    case 3:
      subject = "UPG Camin: Cererea ta a fost aprobată";
      htmlContent = `
        <p>Salutare,</p>
        <p>Cererea ta pentru loc de parcare a fost aprobată!</p>
        <p>Cu drag,</p>
        <p>Administratia Caminului UPG</p>
      `;
      break;
    case 1:
      subject = "UPG Camin: Cererea ta a fost respinsă";
      htmlContent = `
        <p>Salutare,</p>
        <p>Ne pare rău să te informăm că cererea ta pentru loc de parcare a fost respinsă.</p>
        <p>Cu drag,</p>
        <p>Administratia Caminului UPG</p>
      `;
      break;
  }

  return { subject, htmlContent };
};

const sendNotificationEmail = async (res, email, status) => {
  try {
    const { subject, htmlContent } = generateEmailContent(status);

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
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email de notificare trimis cu succes.");
    res.status(200).send("Success");
  } catch (error) {
    console.error("Eroare la trimiterea email-ului de notificare:", error);
    res.status(500).send("Eroare trimitere mail.");
  }
};

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedFields = req.body;

  console.log(updatedFields, "updateFields");
  console.log(id, "id");

  if (!id || !updatedFields) {
    return res.status(400).json({ message: "ID and updatedFields are required" });
  }

  const sql = "UPDATE parking_requests SET ? WHERE id = ?";

  db.query(sql, [updatedFields, id], async (err, result) => {
    if (err) {
      console.error("Error updating complaint:", err);
      return res.status(500).send("Error updating complaint");
    }
    console.log("Complaint updated successfully");

    try {
      const email = await getEmail(id);
      if (email) {
        await sendNotificationEmail(res, email, updatedFields.status);
      } else {
        res.status(404).send("Email not found for the given ID");
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error processing the request");
    }
  });
});

module.exports = router;
