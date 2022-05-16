const express = require("express");
const parseGame = require("../util/parseGame");
const addGame = require("../util/addGame");
const config = require("../config");
const gameIsDuplicate = require("../util/gameIsDuplicate");
const autocompleteByAliases = require("../util/autocompleteByAliases");
const db = require("../database/db");
const {
  getOverview,
  getPlayer,
  getMatch,
  getMatches,
  getPlayers,
} = require("../util/fetchData");

const router = express.Router();

router.post("/api/login", (req, res) => {
  if (req.body.password !== config.password)
    return res.boom.forbidden("Incorrect password.");

  // Mark user as authed
  req.session.admin = true;

  // 200 gets sent before the redirect, so explode and catch it client side
  res
    .location("/admin/tools")
    .boom.teapot("Login succeeded, catching error to redirect.");
});

// Tells the client whether or not they are logged in
router.get("/api/isAdmin", (req, res) => {
  req.session.admin ? res.status(200).send() : res.boom.unauthorized();
});

// Logs the current user out of their session. Does nothing if not logged in
router.get("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.boom.badImplementation("Failed to log out");
    res.status(200).clearCookie("connect.sid").send();
  });
});

// Home page / overview
router.get("/api/recent", (req, res) => {
  const recents = getOverview(db);
  res.status(200).json(recents);
});

router.get("/api/matches", (req, res) => {
  let { startDate, endDate } = new URLSearchParams(req.url);
  if (!startDate) startDate = 0;
  if (!endDate) endDate = new Date().getTime();
  if (startDate > endDate) {
    let temp = endDate;
    endDate = startDate;
    startDate = temp;
  }

  const matchesData = getMatches(db, startDate, endDate);
  res.status(200).json(matchesData);
});

router.get("/api/match/:datePlayed", (req, res) => {
  const matchData = getMatch(db, req.params.datePlayed);
  res.status(200).json(matchData);
});

router.get("/api/players", (req, res) => {
  const playersData = getPlayers(db);
  res.status(200).json(playersData);
});

router.get("/api/player/:playerName", (req, res) => {
  const playerData = getPlayer(db, req.params.playerName);
  res.status(200).json(playerData);
});

// Auth required
router.post("/api/verifyData", (req, res) => {
  try {
    if (!req.session.admin) return res.boom.unauthorized();
    const gameData = parseGame(req.body.gameData);
    const isDupe = gameIsDuplicate(db, gameData);
    if (isDupe) return res.boom.conflict("This game has already been added.");

    const autocompleted = autocompleteByAliases(db, gameData);

    res.status(200).json(autocompleted);
  } catch (error) {
    res.boom.badData("Game data could not be parsed.");
  }
});

// Auth required
router.post("/api/logGame", (req, res) => {
  try {
    if (!req.session.admin) return res.boom.unauthorized();
    const { gameData } = req.body;
    const isDupe = gameIsDuplicate(db, gameData);
    if (isDupe) return res.boom.conflict("This game has already been added.");

    const didAdd = addGame(db, gameData);
    if (!didAdd) throw Error();

    res.status(200).send();
  } catch (error) {
    res.boom.badData(
      "Game could not be logged. Make sure all IGNs are assigned a player."
    );
  }
});

module.exports = router;
