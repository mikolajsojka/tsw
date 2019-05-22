const express = require("express");

const router = express.Router();
const appController = require("../controllers/appController");

router.get("/check", appController.start);

module.exports = router;
