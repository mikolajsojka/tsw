//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const serveStatic = require("serve-static");

const httpServer = require("http").createServer(app);

const socketio = require("socket.io");
const io = socketio.listen(httpServer);

app.use(serveStatic("public"));

io.sockets.on("connect", socket => {

  socket.on("login", data => {
    console.log(`Użytkownik: ${data}`);
  });
});

httpServer.listen(port, () => {
  console.log(`Express działa na porcie ${port}`);
});
