const mongoose = require("mongoose");

const CookieSchema = mongoose.Schema({
    id: {
        type: String,
        expireAfterSeconds: 900
    }
});

const Cookie = (module.exports = mongoose.model("Cookie", CookieSchema));

module.exports.createCookie = (newCookie, callback) => {
    newCookie.save(callback);
};
