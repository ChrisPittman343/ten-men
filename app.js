require("dotenv").config();

const express = require("express");
const boom = require("express-boom");
const path = require("path");
const logger = require("morgan");
const session = require("./middleware/session");
const config = require("./config");
const db = require("./database/db");

const apiRoutes = require("./routes/api");

const app = express();

app.disable("x-powered-by");
app.use(boom());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session);

app.use("/", apiRoutes);

// Serve svelte files
app.use(
  express.static(path.join(__dirname, "frontend/public"), {
    maxAge: config.dev ? undefined : "30d",
  })
);
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/public/index.html"));
});

module.exports = app;
