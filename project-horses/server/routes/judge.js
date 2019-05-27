const Judge = require("../models/Judge");
const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

router.get("/getjudges", (_req, res) => {
    Judge.find({}, (_err, judges) => {
        res.status(200).json(judges);
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
