const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const getFreshDB = (verbose = false) => {
  const freshDB = new Database("", {
    verbose: (msg) => {
      if (verbose) console.log(msg);
    },
  });
  freshDB.exec(
    fs.readFileSync(path.join(__dirname, "../database/sql/init.sql"), "utf8")
  );
  return freshDB;
};

module.exports = getFreshDB;
