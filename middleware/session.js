const session = require("express-session");
const config = require("../config");
const SqliteStore = require("better-sqlite3-session-store")(session);
const sessionsDB = require("better-sqlite3")("./database/sessions.db");

module.exports = session({
  store: new SqliteStore({
    client: sessionsDB,
    expired: {
      clear: true,
      intervalMs: 900000, //ms = 15min
    },
  }),
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: !config.dev,
    maxAge: 8 * 7 * 24 * 60 * 60 * 1000, // 8 weeks
  },
});
