// config.js
module.exports = {
  port: process.env.PORT || 3000, // portul pe care serverul va asculta
  session: {
    secret: process.env.SESSION_SECRET || "oCheieSecretaFoartePuternicaSiUnica",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 12 * 60 * 60 * 1000, // 12 ore în milisecunde
      secure: process.env.NODE_ENV === "production", // true în producție
    },
  },
  cors: {
    origin: process.env.CORS_ORIGIN || ["http://localhost:19006", "https://localhost:19006"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  },
  database: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "parola",
    database: process.env.DB_DATABASE || "nume_baza_de_date",
  },
};
