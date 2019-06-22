const Class = require("../models/Class");
const Horse = require("../models/Horse");
const ObjectId = require("mongodb").ObjectID;

const express = require("express");

const router = express.Router();

let expressValidator = require("express-validator");

router.use(expressValidator());

const mongoose = require("mongoose");

module.exports = (io) => {
    io.on("connect", (socket) => {
        socket.on("getclassesinit", () => {
            Class.find({}, (_err, classes) => {
                socket.emit("getclasses", classes);
            });
        });

        router.get("/getclasses", (_req, res) => {
            Class.find({}, (_err, classes) => {
                res.status(200).json(classes);
            });
        });

        router.post("/add", (req, res) => {
            let { item } = req.body;
            let number = 0;

            req.checkBody("item.category", "Wymagana jest nazwa klasy!").notEmpty();

            let errors = req.validationErrors();

            if (errors) {
                res.status(400).json(errors);
            }
            else {
                Class.find({}, (err, items) => {
                    items.forEach((element) => {
                        if (parseInt(element.number) > number) {
                            number = parseInt(element.number);
                        }
                    });
                    number += 1;
                    let newClass = new Class({
                        number,
                        category: item.category,
                        committee: item.committee
                    });

                    Class.createClass(newClass, (err, _class) => {
                        if (err) throw err;

                        res.status(200).json(newClass);

                        socket.emit("addclass", {
                            number, _id: newClass._id, category: newClass.category, committee: newClass.committee, status: false
                        });
                        socket.broadcast.emit("addclass", {
                            number, _id: newClass._id, category: newClass.category, committee: newClass.committee, status: false
                        });
                    });
                });
            }
        });

        router.post("/edit", (req, res) => {
            let { item } = req.body;

            Class.updateOne(
                { _id: ObjectId(item._id) },
                {
                    $set: {
                        committee: item.committee,
                        number: item.number,
                        category: item.category

                    }
                },
                (err) => {
                    if (err) {
                        res.status(400).send("Coś poszło nie tak..");
                    }
                    else {
                        res.status(200).send("OK");
                        socket.emit("editclass", {
                            _id: item._id,
                            committee: item.committee,
                            number: item.number,
                            category: item.category
                        });
                        socket.broadcast.emit("editclass", {
                            _id: item._id,
                            committee: item.committee,
                            number: item.number,
                            category: item.category
                        });
                    }
                }
            );
        });

        router.post("/delete/:id", (req, res) => {
            let { id } = req.params;

            Class.findOne({ _id: ObjectId(id) }, (err, item) => {
                Horse.updateMany(
                    { class: item.number },
                    {
                        $set: {
                            class: -1,
                            result: {
                                notes: []
                            }
                        }
                    },
                    (err) => {
                        if (err) {
                            res.status(400).send("Coś poszło nie tak..");
                        }
                    }
                );
            });

            Class.deleteOne({ _id: ObjectId(id) }, (err, item) => {
                if (err) {
                    res.status(400).send("Coś poszło nie tak..");
                }
                else {
                    res.status(200).send("OK");
                    socket.emit("deleteClass", id);
                    socket.broadcast.emit("deleteClass", id);
                }
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
    });

    return router;
};
