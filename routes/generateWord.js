const express = require("express");
const router = express.Router();
const fs = require("fs");
const createReport = require("docx-templates");

router.post("/", async (req, res) => {
  const { userData } = req.body;

  try {
    const templatePath = "../wordTemplates/template";
    const template = fs.readFileSync(templatePath, "base64");

    const report = await createReport({
      template,
      data: userData,
    });

    const outputPath = "../wordTemplates/generated-template.docx";
    fs.writeFileSync(outputPath, report, "base64");

    res.download(outputPath, "generated-document.docx", (err) => {
      if (err) {
        console.error("Error sending document:", err);
      }
      // fs.unlinkSync(outputPath); 
    });
  } catch (error) {
    console.error("Error generating document:", error);
    res.status(500).send("Error generating document");
  }
});

module.exports = router;
