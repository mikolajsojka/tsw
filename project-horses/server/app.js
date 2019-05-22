const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const httpServer = require("http").createServer(app);
const serveStatic = require("serve-static");

const indexRouter = require("./routes/index");

app.use("/", indexRouter);
app.use(serveStatic("public"));

httpServer.listen(port, () => {
    console.log(`Express działa na porcie ${port}`);
});
