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

const store = new MongoStore({
    url: "mongodb://localhost/projecthorses",
    ttl: 600
});

app.use(cookieParser());

app.use(
    session({
        key: "express.sid",
        store,
        secret: "keyboard cat",
        saveUninitialized: false,
        resave: true,
        cookie: { secure: true }
    })
);

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(passport.session());

const server = app.listen(port, () => {
    console.log(`Express działa na porcie ${port}`);
});

const io = require("socket.io")(server);

const passportSocketIo = require("passport.socketio");

/*
io.use(passportSocketIo.authorize({
    cookieParser,
    key: "express.sid",
    secret: "keyboard cat",
    store
}));
*/

const userRouter = require("./routes/user")(io);
const horseRouter = require("./routes/horse")(io);
const judgeRouter = require("./routes/judge")(io);
const classRouter = require("./routes/class")(io);

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/project-horses", {
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("connected with mongo");
});

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
