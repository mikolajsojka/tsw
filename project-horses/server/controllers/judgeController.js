const Judge = require("../models/Judge");

exports.random_judges = (req, res) => {
    let { judges } = req.body;

    judges.forEach((element) => {
        Judge.findOne(
            {
                id: element.id,
                judge: element.sedzia,
                country: element.kraj
            },
            (_err, judge) => {
                if (!judge) {
                    let newJudge = new Judge({
                        id: element.id,
                        judge: element.sedzia,
                        country: element.kraj
                    });
                    Judge.createJudge(newJudge, (err, _judge) => {
                        if (err) throw err;
                    });
                }
            }
        );
    });

    res.send("Serwer działa na porcie 3000");
};
