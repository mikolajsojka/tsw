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
let ObjectId = require("mongodb").ObjectID;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});

const userSchema = mongoose.Schema({ username: String, status: String });
let User = mongoose.model("User", userSchema);

const chatSchema = mongoose.Schema({
  user_1: String,
  user_2: String,
  messages: [
    {
      message: String,
      author: String
    }
  ]
});
let Chat = mongoose.model("Chat", chatSchema);

const chatAllSchema = mongoose.Schema({
  messages: [
    {
      message: String,
      author: String
    }
  ]
});
let chatAll = mongoose.model("chatAll", chatAllSchema);

const httpServer = require("http").createServer(app);

const socketio = require("socket.io");
const io = socketio.listen(httpServer);
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(serveStatic("public"));

io.sockets.on("connect", socket => {
  socket.on("chat-all", () => {
    chatAll.findOne({}, function(err, messages) {
      if (messages) {
        socket.emit("chat-all-fill-passed", JSON.stringify(messages.messages));
      } else {
        socket.emit("chat-all-fill-failed");
      }
      if (err) {
        console.log("Nie tak");
      }
    });
  });

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
          User.updateOne(
            { username: newUser.username },
            {
              $set: {
                status: "online"
              }
            },
            function(err) {
              if (err) {
                console.log("Coś nie tak poszło przy logowaniu");
              } else {
                console.log("niby zalogowano");

                socket.emit("authentication-passed", JSON.stringify(user));
              }
            }
          );
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
  });

  socket.on("logout", data => {
    console.log(data);

    User.updateOne(
      { _id: ObjectId(data._id) },
      {
        $set: {
          status: "offline"
        }
      },
      function(err) {
        if (err) {
          console.log("Coś nie tak poszło przy wylogowaniu");
        } else {
          console.log("niby wylogowano");

          socket.emit("logout-passed");
        }
      }
    );
  });

  socket.on("send-message", data => {
    chatAll.findOne({}, function(err, messages) {
      let new_message = messages.messages;

      new_message.push({ message: data.message, author: data.author });
      console.log(new_message);
      if (messages) {
        chatAll.updateOne(
          { _id: ObjectId(messages._id) },
          {
            $set: {
              messages: new_message
            }
          },
          function(err) {
            if (err) {
              console.log("Coś nie tak poszło przy dodawaniu wiadomości");
            } else {
              console.log("niby dodane");

              socket.broadcast.emit("write-message", data);
              socket.emit("write-message", data);
            }
          }
        );
      }
      if (err) {
        console.log("Nie znaleziono w bazie");
      }
    });
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
