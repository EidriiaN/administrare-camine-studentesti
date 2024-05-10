// app.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const IP_ADDRESS = process.env.URL;

app.use(
  session({
    secret: "secretkeymiauham",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 12 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false, // Asigură-te că este setat pe true pentru conexiunile HTTPS
    },
  })
);

const loginRoute = require("./routes/login");
const indexRoute = require("./routes/index");
const checkSession = require("./controllers/checkSession");
const getAdminData = require("./routes/getAdminData");
const getSessionData = require("./controllers/getSessionData");
const register_request = require("./routes/register-request");
const getRegister_requests = require("./routes/getRegister-requests");
const acceptRegisterRequest = require("./routes/acceptRegisterRequest");
const rejectRegisterRequest = require("./routes/rejectRegisterRequest");
const addAnnounce = require("./routes/addAnnounce");
const getAnnounces = require("./routes/getAnnounces");
const addComplain = require("./routes/addComplain");
const getComplains = require("./routes/getComplains");
const getAdminComplains = require("./routes/getAdminComplains");

app.use(bodyParser.json());
// app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:19006",
      "https://localhost:19006",
      "http://localhost:3000",
      "http://192.168.0.101:19006",
      "http://192.168.0.101:3000",
      "http://192.168.0.87:3000",
      "http://95.77.125.103:3000",
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
app.use("/register-request", register_request);
app.use("/getRegister-requests", getRegister_requests);
app.use("/acceptRegisterRequest", acceptRegisterRequest);
app.use("/rejectRegisterRequest", rejectRegisterRequest);
app.use("/addAnnounce", addAnnounce);
app.use("/getAnnounces", getAnnounces);
app.use("/addComplain", addComplain);
app.use("/getComplains", getComplains);
app.use("/getAdminComplains", getAdminComplains);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serverul ruleaza la adresa: http://${IP_ADDRESS}:${PORT}`);
});
