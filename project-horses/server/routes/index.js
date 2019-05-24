const express = require("express");

const router = express.Router();
const appController = require("../controllers/appController");
const userController = require("../controllers/userController");
const judgeController = require("../controllers/judgeController");
const horseController = require("../controllers/horseController");
const classController = require("../controllers/classController");

router.get("/check", appController.start);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/user", userController.user);
router.get("/appconfig/createadmin", userController.create_admin);

router.post("/data/randomjudges", judgeController.random_judges);
router.post("/data/randomhorses", horseController.random_horses);
router.post("/data/randomclasses", classController.random_classes);

module.exports = router;
