const session = require("express-session");
const config = require("../config");
const db = require("../database/db");
const PostgresSession = require("connect-pg-simple")(session);

module.exports = session({
  store: new PostgresSession({
    pool: db,
    schemaName: "public",
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    sameSite: "none",
    httpOnly: true,
    secure: !config.dev,
    maxAge: 8 * 7 * 24 * 60 * 60 * 1000, // 8 weeks
  },
});
