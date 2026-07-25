const express = require("express");
const router = express.Router();
const {
  sendQuestion,
  checkAnswer,
  scoreboard,
  userData,
} = require("../controllers/dashboard.controller.js");

router.get("/", sendQuestion);
router.post("/", userData);
router.post("/answer", checkAnswer);
router.get("/scoreboard", scoreboard);

module.exports = router;
