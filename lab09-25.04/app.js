//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const serveStatic = require("serve-static");

let cookieParser = require("cookie-parser");
let session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  }),
  sharedsession = require("express-socket.io-session");

app.use(cookieParser());

app.use(session);

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

io.use(sharedsession(session));

io.sockets.on("connect", socket => {
  socket.on("chat-all", currentChat => {
    socket.handshake.session.currentChat = currentChat;
    socket.handshake.session.save();

    let chatName = socket.handshake.session.currentChat;

    if (chatName === "general-chat") {
      chatAll.findOne({}, function(err, messages) {
        if (messages) {
          socket.emit(
            "chat-all-fill-passed",
            JSON.stringify(messages.messages)
          );
        } else {
          socket.emit("chat-all-fill-failed");
        }
        if (err) {
          console.log("Nie tak");
        }
      });
    } else {
      console.log("Coś majstrowałeś..");
    }
  });

  socket.on("authentication", data => {
    if (data) {
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

                  socket.handshake.session.userdata = newUser;
                  socket.handshake.session.save();

                  socket.emit(
                    "authentication-passed",
                    JSON.stringify(socket.handshake.session.userdata)
                  );
                }
              }
            );
          }
        } else {
          newUser.save(function(err, _newUser) {
            if (err) return console.error(err);
          });

          socket.handshake.session.userdata = newUser;
          socket.handshake.session.save();
          socket.emit(
            "authentication-passed",
            JSON.stringify(socket.handshake.session.userdata)
          );
        }
        if (err) {
          console.log("Nie tak");
        }
      });
    } else {
      console.log("data jest puste");
    }
  });

  socket.on("logout", () => {
    let data = socket.handshake.session.userdata;

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

          delete socket.handshake.session.userdata;
          socket.handshake.session.save();

          socket.emit("logout-passed");
        }
      }
    );
  });

  socket.on("send-message", chatName => {
    let data = chatName;
    data.currentChat = socket.handshake.session.currentChat;
    data.author = socket.handshake.session.userdata.username;

    if (data.currentChat === "general-chat" && data.author) {
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
    } else {
      console.log("Coś nie tak z wyborem czatu");
    }
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
