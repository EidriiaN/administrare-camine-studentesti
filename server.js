// app.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const IP_ADDRESS = "localhost";

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 12 * 60 * 60 * 1000,
      secure: false, // Asigură-te că este setat pe true pentru conexiunile HTTPS
    },
  })
);

const loginRoute = require("./routes/login");
const indexRoute = require("./routes/index");
const checkSession = require("./controllers/checkSession");
const getAdminData = require("./routes/getAdminData");
const getSessionData = require("./controllers/getSessionData");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:19006",
      "https://localhost:19006",
      "http://localhost:3000",
      "http://192.168.0.101:19006",
      "http://192.168.0.101:3000",
      "exp://192.168.0.101:8081",
      "http://192.168.0.101:8081",
      "http://192.168.0.102:59782",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  })
);

// Adaugarea console.log pentru a afisa originile cererilor
app.use((req, res, next) => {
  console.log(req.headers.origin, "origine"); // Afișează originile cererilor în consolă
  next(); // Continuă cu următorul middleware sau rută
});

// Use the route handlers
app.use("/login", loginRoute);
app.use("/", indexRoute);
app.use("/checkSession", checkSession);
app.use("/getAdminData", getAdminData);
app.use("/getSessionData", getSessionData);

app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Serverul este ascultat la adresa: http://${IP_ADDRESS}:${PORT}`);
});
