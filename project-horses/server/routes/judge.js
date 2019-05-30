const Judge = require("../models/Judge");
const express = require("express");
const ObjectId = require("mongodb").ObjectID;

const router = express.Router();

const mongoose = require("mongoose");

router.get("/getjudges", (_req, res) => {
    Judge.find({}, (_err, judges) => {
        res.status(200).json(judges);
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
            }
        }
    );
});

router.post("/delete/:id", (req, res) => {
    let { id } = req.params;

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

module.exports = router;
