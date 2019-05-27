const Class = require("../models/Class");

const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

router.get("/getclasses", (_req, res) => {
    Class.find({}, (_err, classes) => {
        res.status(200).json(classes);
    });
});

router.post("/randomclasses", (req, res) => {
    let { classes } = req.body;

    mongoose.connect("mongodb://localhost:27017/project-horses", {
        useNewUrlParser: true
    });

    const db = mongoose.connection;

    db.dropCollection("classes", (err, result) => {});

    let responseclasses = [];
    let counter = 0;

    classes.forEach((element) => {
        Class.findOne(
            {
                id: element.id
            },
            (_err, hclass) => {
                if (!hclass) {
                    let newClass = new Class({
                        number: element.numer,
                        category: element.kat,
                        committee: element.komisja
                    });
                    counter += 1;
                    responseclasses.push(newClass);
                    Class.createClass(newClass, (err, _class) => {
                        if (err) throw err;
                    });
                    if (counter === classes.length) {
                        res.status(200).json(responseclasses);
                    }
                }
            }
        );
    });
});

module.exports = router;
