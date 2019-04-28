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

    User.findOne({ username: newUser.username }, (err, user) => {
      if (user) {
        if (user.status === "online") {
          socket.emit("authentication-failed");
        } else {
          socket.emit("authentication-passed", JSON.stringify(user));
        }
      } else {
        newUser.save(function(err, _newUser) {
          if (err) return console.error(err);
        });
        socket.emit("authentication-passed", JSON.stringify(newUser));
      }
      if (err) {
        console.log("Nie tak");
      }
    });

    //najpierw sprawdź czy online

    //jak jest wolny nickname, ale w bazie to tylko go zaloguj

    //jak nie ma to dodaj do bazy
  });

  socket.on("search-user", data => {
    User.findOne({ username: data }, (err, user) => {
      if (user) {
        socket.emit("search-user-passed");
      } else {
        socket.emit("search-user-failed");
      }
      if (err) {
        console.log("Nie tak");
      }
    });
  });
});

httpServer.listen(port, () => {
  console.log(`Express działa na porcie ${port}`);
});
