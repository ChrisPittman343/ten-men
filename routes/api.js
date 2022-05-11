const express = require("express");

const router = express.Router();

router.post("/api/verifyData", (req, res) => {
  res.send("Verifying...");
});

module.exports = router;
