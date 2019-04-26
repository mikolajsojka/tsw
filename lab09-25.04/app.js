//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const serveStatic = require("serve-static");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chat-socket-io", {
  useNewUrlParser: true
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});

const userSchema = mongoose.Schema({ username: String, status: String });
let User = mongoose.model("User", userSchema);

const httpServer = require("http").createServer(app);

const socketio = require("socket.io");
const io = socketio.listen(httpServer);

app.use(serveStatic("public"));

io.sockets.on("connect", socket => {
  socket.on("authentication", data => {
    let newUser = new User({
      username: data,
      status: "online"
    });

    newUser.save(function(err, _newUser) {
      if (err) return console.error(err);
    });

    socket.emit("login", JSON.stringify(newUser));
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("write",data);
    socket.emit("write",data);
  });
});

httpServer.listen(port, () => {
  console.log(`Express działa na porcie ${port}`);
});
