// app.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const loginRoute = require("./routes/login");
const indexRoute = require("./routes/index");
const checkSession = require("./controllers/checkSession");

const app = express();
const PORT = 3000;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 12 * 60 * 60 * 1000,
      secure: false,
    },
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["*"],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  })
);

// Use the route handlers
app.use("/login", loginRoute);
app.use("/", indexRoute);
app.use("/checkSession", checkSession);

app.listen(PORT, () => {
  console.log("The server is listening on Port ", PORT);
});
