const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const serveStatic = require("serve-static");

const indexRouter = require("./routes/index");

app.use("/", indexRouter);
app.use(serveStatic("public"));

const server = app.listen(port, () => {
    console.log(`Express działa na porcie ${port}`);
});

const io = require("socket.io")(server);
require("./socket.js")(io);
