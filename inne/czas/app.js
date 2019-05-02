//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const serveStatic = require("serve-static");

const httpServer = require("http").createServer(app);

const socketio = require("socket.io");
const io = socketio.listen(httpServer);
let alarm_hours;
let alarm_minutes;
const cron = require("node-cron");

app.use(serveStatic("public"));

io.sockets.on("connect", socket => {
  socket.emit("after-connect", () => {});
  cron.schedule("*/1 * * * * *", () => {
    let today = new Date();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    if (
      alarm_hours === today.getHours() &&
      alarm_minutes === today.getMinutes()
    ) {
      socket.emit("play-sound");
    }

    socket.emit("get-time", {
      time: time
    });

    socket.on("set-alarm", data => {
      if (data) {
        alarm_hours = data.hours;
        alarm_minutes = data.minutes;
      }
    });
  });
});

httpServer.listen(port, () => {
  console.log(`Express działa na porcie ${port}`);
});
