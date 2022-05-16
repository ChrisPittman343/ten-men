const fs = require("fs");
const Database = require("better-sqlite3");
const path = require("path");
const db = new Database("./database/tenMen.db", { verbose: console.log });

db.exec(fs.readFileSync(path.join(__dirname, "/sql/init.sql"), "utf8"));

module.exports = db;
