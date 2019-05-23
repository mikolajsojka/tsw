const express = require("express");

const router = express.Router();
const appController = require("../controllers/appController");
const userController = require("../controllers/userController");

router.get("/check", appController.start);
router.post("/login", userController.login);

module.exports = router;
