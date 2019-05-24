const Class = require("../models/Class");

exports.random_classes = (req, res) => {
    let { classes } = req.body;

    classes.forEach((element) => {
        Class.findOne(
            {
                number: element.numer,
                category: element.kat,
                committee: element.komisja
            },
            (_err, hclass) => {
                if (!hclass) {
                    let newClass = new Class({
                        number: element.numer,
                        category: element.kat,
                        committee: element.komisja
                    });
                    Class.createClass(newClass, (err, _class) => {
                        if (err) throw err;
                    });
                }
            }
        );
    });

    res.send("Serwer działa na porcie 3000");
};
