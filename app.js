require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const db = require("./database/db");

const pageRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", apiRoutes);
app.use("/", pageRoutes);

module.exports = app;
