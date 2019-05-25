const express = require("express");

const app = express();
const port = process.env.PORT || 3001;
var session = require("express-session");

const serveStatic = require("serve-static");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

const passport = require("passport");

app.use(cookieParser());

app.use(
    session({
        secret: "horses",
        saveUninitialized: false,
        resave: true,
        cookie: { secure: true }
    })
);

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(passport.session());

const userRouter = require("./routes/user");
const horseRouter = require("./routes/horse");
const judgeRouter = require("./routes/judge");
const classRouter = require("./routes/class");

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

const server = app.listen(port, () => {
    console.log(`Express działa na porcie ${port}`);
});

const io = require("socket.io")(server);
require("./socket.js")(io);
