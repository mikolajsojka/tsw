//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const serveStatic = require("serve-static");

const httpServer = require("http").createServer(app);

const socketio = require("socket.io");
const io = socketio.listen(httpServer);

const cron = require("node-cron");

app.use(serveStatic("public"));

io.sockets.on("connect", socket => {
  cron.schedule("*/1 * * * * *", () => {
    let today = new Date();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    socket.emit("get-time",time);
  });
});

httpServer.listen(port, () => {
  console.log(`Express działa na porcie ${port}`);
});
