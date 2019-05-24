const mongoose = require("mongoose");

const JudgeSchema = mongoose.Schema({
    judge: {
        type: String,
        index: true
    },
    country: {
        type: String
    }
});

const Judge = (module.exports = mongoose.model("Judge", JudgeSchema));

module.exports.createJudge = (newJudge, callback) => {
    newJudge.save(callback);
};
