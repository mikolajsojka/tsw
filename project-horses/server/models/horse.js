const mongoose = require("mongoose");

const HorseSchema = mongoose.Schema({
    number: {
        type: Number,
        index: true
    },
    class: {
        type: Number
    },
    name: {
        type: String
    },
    country: {
        type: String
    },
    yob: {
        type: String
    },
    hair: {
        type: String
    },
    sex: {
        type: String
    },
    owner: {
        name: String,
        country: String
    },
    breeder: {
        name: String,
        country: String
    },
    bloodline: {
        father: {
            name: String,
            country: String
        },
        mother: {
            name: String,
            country: String
        },
        fathermother: {
            name: String,
            country: String
        }
    },
    result: {
        notes: [
            {
                htype: Number,
                head: Number,
                barrel: Number,
                legs: Number,
                move: Number
            }
        ]
    }
});

const Horse = (module.exports = mongoose.model("Horse", HorseSchema));

module.exports.createHorse = (newHorse, callback) => {
    newHorse.save(callback);
};
