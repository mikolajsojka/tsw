const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const serveStatic = require("serve-static");

const indexRouter = require("./routes/index");

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/project-horses", {
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("connected with mongo");
});

app.use(cors());
app.use("/", indexRouter);
app.use(serveStatic("public"));

const server = app.listen(port, () => {
    console.log(`Express działa na porcie ${port}`);
});

const io = require("socket.io")(server);
require("./socket.js")(io);
