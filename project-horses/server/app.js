const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

const session = require("express-session");

const serveStatic = require("serve-static");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));


const passport = require("passport");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/project-horses", {
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("connected with mongo");
});

const store = new MongoStore({
    url: "mongodb://localhost/project-horses",
    ttl: 60
});

app.use(cookieParser());

let sessionMiddleware = session({
    key: "express.sid",
    store,
    secret: "session_secret"
});

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(passport.session());

const server = app.listen(port);

const io = require("socket.io")(server);

app.use(sessionMiddleware);
const passportSocketIo = require("passport.socketio");

/*
io.use(passportSocketIo.authorize({
    cookieParser,
    key: "express.sid",
    secret: "session_secret",
    store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
}));

function onAuthorizeSuccess(data, accept) {
    console.log("successful connection to socket.io");

    accept(null, true);

    accept();
}

function onAuthorizeFail(data, message, error, accept) {
    if (error) {
        throw new Error(message);
    }
    console.log("failed connection to socket.io:", message);

    accept(null, false);

    if (error) {
        accept(new Error(message));
    }
}
*/

app.use((req, res, next) => {
    next();
});

const userRouter = require("./routes/user")(io);
const horseRouter = require("./routes/horse")(io);
const judgeRouter = require("./routes/judge")(io);
const classRouter = require("./routes/class")(io);

app.use(
    cors({
        credentials: true
    })
);

app.use("/user", userRouter);
app.use("/horse", horseRouter);
app.use("/judge", judgeRouter);
app.use("/class", classRouter);

app.use(serveStatic("public"));
