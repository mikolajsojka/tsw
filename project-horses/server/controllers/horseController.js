const Horse = require("../models/Horse");

exports.random_horses = (req, res) => {
    let { horses } = req.body;

    horses.forEach((element) => {
        Horse.findOne(
            {
                number: element.numer,
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

    res.send("Serwer działa na porcie 3000");
};
