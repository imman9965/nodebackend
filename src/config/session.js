const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();
const pool = require("./db");

const sessionMiddleware = session({
  store: new pgSession({
    pool: pool,
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
});

module.exports = sessionMiddleware;
