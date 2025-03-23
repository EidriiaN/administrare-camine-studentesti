// app.js
require("dotenv").config();
const https = require("https");
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const IP_ADDRESS = process.env.URL;

const options = {
  key: fs.readFileSync("/usr/local/hestia/data/users/admin/ssl/mycampus.adrian-neagu.ro.key"), // Cheia privată
  cert: fs.readFileSync("/usr/local/hestia/data/users/admin/ssl/mycampus.adrian-neagu.ro.crt"), // Certificatul
};

app.use(
  session({
    secret: "secretkeymiauham",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 12 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
    },
  })
);

const indexRoute = require("./routes/index");
const forgotPassword = require("./routes/forgotPassword");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout.js");
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
const deleteComplain = require("./routes/deleteComplain");
const getUserInfo = require("./routes/getUserInfo");
const deleteAnnounce = require("./routes/deleteAnnounce");
const getRooms = require("./routes/getRooms");
const addParkingRequest = require("./routes/addParkingRequest");
const getRoomData = require("./routes/getRoomData.js");
const resolveComplain = require("./routes/resolveComplain.js");
const getParkingRequests = require("./routes/getParkingRequests.js");
const getStudentsRoomData = require("./routes/getStudentsRoomData.js");
const getIssues = require("./routes/getIssues.js");
const updateParkingRequest = require("./routes/updateParkingRequest.js");
const modifyRoom = require("./routes/modifyRoom.js");
const deleteStudentRoom = require("./routes/deleteStudentRoom.js");
const getAllRoomsStudents = require("./routes/getAllRoomsStudents.js");
const addStudentInRoom = require("./routes/addStudentInRoom.js");

app.use(bodyParser.json());
// app.use(cookieParser());

app.use(
  cors({
    origin: [
	  "https://mycampus.adrian-neagu.ro",
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
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH"],
  })
);

// Adaugarea console.log pentru a afisa originile cererilor
app.use((req, res, next) => {
  console.log(req.headers.origin, "origine"); // Afișează originile cererilor în consolă
  next(); // Continuă cu următorul middleware sau rută
});

// Use the route handlers
app.use("/", indexRoute);
app.use("/forgotPassword", forgotPassword);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
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
app.use("/deleteComplain/", deleteComplain);
app.use("/getUserInfo", getUserInfo);
app.use("/deleteAnnounce", deleteAnnounce);
app.use("/getRooms", getRooms);
app.use("/addParkingRequest", addParkingRequest);
app.use("/getRoomData", getRoomData);
app.use("/resolveComplain", resolveComplain);
app.use("/getParkingRequests", getParkingRequests);
app.use("/getStudentsRoomData", getStudentsRoomData);
app.use("/getIssues", getIssues);
app.use("/updateParkingRequest", updateParkingRequest);
app.use("/modifyRoom", modifyRoom);
app.use("/deleteStudentRoom", deleteStudentRoom);
app.use("/getAllRoomsStudents", getAllRoomsStudents);
app.use("/addStudentInRoom", addStudentInRoom);

// Pornește serverul HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`Serverul rulează la adresa: https://${IP_ADDRESS}:${PORT}`);
});

