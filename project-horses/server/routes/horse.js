const Horse = require("../models/Horse");
const express = require("express");

const router = express.Router();

router.get("/gethorses", (_req, res) => {
    Horse.find({}, (_err, horses) => {
        res.status(200).json(horses);
    });
});

router.post("/randomhorses", (req, res) => {
    let { horses } = req.body;

    horses.forEach((element) => {
        Horse.findOne(
            {
                number: element.numer,
                id: element.id,
                name: element.nazwa,
                country: element.kraj,
                yob: element.rocznik,
                sex: element.plec,
                hair: element.masc
            },
            (_err, horse) => {
                if (!horse) {
                    let notes = [];
                    element.wynik.noty.forEach((elem) => {
                        notes.push({
                            htype: elem.typ,
                            head: elem.glowa,
                            barrel: elem.kloda,
                            legs: elem.nogi,
                            move: elem.ruch
                        });
                    });
                    let newHorse = new Horse({
                        id: element.id,
                        number: element.numer,
                        class: element.klasa,
                        name: element.nazwa,
                        country: element.kraj,
                        yob: element.rocznik,
                        hair: element.masc,
                        sex: element.plec,
                        breeder: {
                            name: element.hodowca.nazwa,
                            country: element.hodowca.kraj
                        },
                        owner: {
                            name: element.wlasciciel.nazwa,
                            country: element.wlasciciel.kraj
                        },
                        bloodline: {
                            father: {
                                name: element.rodowod.o.nazwa,
                                country: element.rodowod.o.kraj
                            },
                            mother: {
                                name: element.rodowod.m.nazwa,
                                country: element.rodowod.m.kraj
                            },
                            fathermother: {
                                name: element.rodowod.om.nazwa,
                                country: element.rodowod.om.kraj
                            }
                        },
                        result: {
                            notes
                        }
                    });
                    Horse.createHorse(newHorse, (err, _horse) => {
                        if (err) throw err;
                    });
                }
            }
        );
    });

    Horse.find({}, (_err, horses) => {
        res.status(200).json(horses);
    });
});

module.exports = router;
