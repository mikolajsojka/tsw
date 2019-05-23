const express = require("express");

const router = express.Router();
const appController = require("../controllers/appController");
const userController = require("../controllers/userController");

router.get("/check", appController.start);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/user", userController.user);

module.exports = router;
