const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
    number: {
        type: Number,
        index: true
    },
    category: {
        type: String
    },
    committee: {
        type: [mongoose.Schema.Types.Number]
    }
});

const Class = (module.exports = mongoose.model("Class", ClassSchema));

module.exports.createClass = (newClass, callback) => {
    newClass.save(callback);
};
