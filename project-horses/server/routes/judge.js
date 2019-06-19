const Judge = require("../models/Judge");
const Horse = require("../models/Horse");
const Class = require("../models/Class");
const express = require("express");
const ObjectId = require("mongodb").ObjectID;

const router = express.Router();

const mongoose = require("mongoose");

module.exports = (io) => {
    io.on("connect", (socket) => {
        socket.on("getjudgesinit", () => {
            Judge.find({}, (_err, judges) => {
                socket.emit("getjudges", judges);
            });
        });
        router.get("/getjudges", (_req, res) => {
            Judge.find({}, (_err, judges) => {
                res.status(200).json(judges);
            });
        });

        router.post("/add", (req, res) => {
            let { item } = req.body;
            let id = 0;

            Judge.find({}, (err, items) => {
                items.forEach((element) => {
                    if (parseInt(element.id) > id) {
                        id = parseInt(element.id);
                    }
                });
                id += 1;
                let newJudge = new Judge({
                    id,
                    judge: item.judge,
                    country: item.country
                });

                Judge.createJudge(newJudge, (err, _judge) => {
                    if (err) throw err;

                    res.status(200).json(newJudge);
                });
            });
        });

        router.post("/edit", (req, res) => {
            let { item } = req.body;
            Judge.updateOne(
                { _id: ObjectId(item._id) },
                {
                    $set: {
                        judge: item.judge,
                        country: item.country,
                        id: item.id
                    }
                },
                (err) => {
                    if (err) {
                        res.status(400).send("Coś poszło nie tak..");
                    }
                    else {
                        res.status(200).send("OK");
                        socket.emit("editjudge", item);
                        socket.broadcast.emit("editjudge", item);
                    }
                }
            );
        });

        router.post("/delete/:id", (req, res) => {
            let { id } = req.params;

            Judge.findOne({ _id: ObjectId(id) }, (err, judge) => {
                Class.find({}, (err, classes) => {
                    classes.forEach((element) => {
                        let newcommittee = [];
                        element.committee.forEach((item, index) => {
                            if (item === judge.id) {
                                Horse.find({ class: element.number }, (err, horses) => {
                                    horses.forEach((horse) => {
                                        let newNotes = [];
                                        horse.result.notes.forEach((note, indexnote) => {
                                            if (index !== indexnote) {
                                                newNotes.push(note);
                                            }
                                        });

                                        Horse.updateOne(
                                            { _id: ObjectId(horse._id) },
                                            {
                                                $set: {
                                                    result: {
                                                        notes: newNotes
                                                    }
                                                }
                                            },
                                            (err) => {
                                                console.log(`dokonano update: ${horse.name}`);
                                                if (err) {
                                                    res.status(400).send("Błąd na pozycji: usuwanie not z kolekcji konie");
                                                }
                                            }
                                        );
                                    });
                                });
                            }
                            else {
                                newcommittee.push(item);
                            }
                        });

                        if (newcommittee !== element.committee) {
                            Class.updateOne(
                                { _id: ObjectId(element._id) },
                                {
                                    $set: {
                                        committee: newcommittee
                                    }
                                },
                                (err) => {
                                    if (err) {
                                        res.status(400).send("Błąd na pozycji: usuwanie sędziego z komisji");
                                    }
                                }
                            );
                        }
                    });
                });
            });

            Judge.deleteOne({ _id: ObjectId(id) }, (err, judge) => {
                if (err) {
                    res.status(400).send("Coś poszło nie tak..");
                }
                else {
                    res.status(200).send("OK");
                }
            });
        });

        router.post("/randomjudges", (req, res) => {
            let { judges } = req.body;

            mongoose.connect("mongodb://localhost:27017/project-horses", {
                useNewUrlParser: true
            });

            const db = mongoose.connection;

            db.dropCollection("judges", (err, result) => {});

            let responsejudges = [];
            let counter = 0;

            judges.forEach((element) => {
                Judge.findOne(
                    {
                        id: element.id
                    },
                    (_err, judge) => {
                        if (!judge) {
                            let newJudge = new Judge({
                                id: element.id,
                                judge: element.sedzia,
                                country: element.kraj
                            });
                            counter += 1;
                            responsejudges.push(newJudge);
                            Judge.createJudge(newJudge, (err, _judge) => {
                                if (err) throw err;
                            });
                            if (counter === judges.length) {
                                console.log(responsejudges);
                                res.status(200).json(responsejudges);
                            }
                        }
                    }
                );
            });
        });
    });
    return router;
};
