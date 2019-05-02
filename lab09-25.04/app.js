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
db.once("open", () => {
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
    let user = socket.handshake.session.userdata;

    if (user && chatName === "general-chat") {
      chatAll.findOne({}, (err, messages) => {
        if (messages) {
          socket.emit(
            "chat-all-fill-passed",
            JSON.stringify(messages.messages)
          );
        } else {
          let newChatAll = new chatAll({
            messages: []
          });

          newChatAll.save((err, _newChatAll) => {
            if (err) return console.error(err);
          });

          socket.emit("empty-chat-all", currentChat);
        }

        if (err) {
          socket.emit("on-err", err);
        }
      });
    }
  });

  socket.on("on-connect", () => {
    socket.emit("after-connect", {
      user: socket.handshake.session.userdata,
      currentChat: socket.handshake.session.currentChat
    });
  });

  socket.on("render-chat", data => {
    if(socket.handshake.session.userdata){
    Chat.findOne({ _id: ObjectId(data) }, (err, chat) => {
      if (chat) {
        socket.handshake.session.currentChat = data;
        socket.handshake.session.save();
        socket.emit("render-chat-window", chat);
      } else if (err) {
        socket.emit("on-err", err);
      } else {
        socket.emit("not-found");
      }
    });
  } else {
    socket.emit("auth-error");
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
              err => {
                if (err) {
                  socket.emit("on-err", err);
                } else {
                  socket.handshake.session.userdata = newUser;
                  socket.handshake.session.save();

                  socket.emit("empty-chat-all", "general-chat");

                  socket.emit(
                    "authentication-passed",
                    JSON.stringify(socket.handshake.session.userdata)
                  );
                }
              }
            );
          }
        } else {
          newUser.save((err, _newUser) => {
            if (err) return console.error(err);
          });

          socket.handshake.session.userdata = newUser;
          socket.handshake.session.save();
          socket.emit("empty-chat-all", "general-chat");

          socket.emit(
            "authentication-passed",
            JSON.stringify(socket.handshake.session.userdata)
          );
        }
        if (err) {
          socket.emit("on-err", err);
        }
      });
    } else {
      socket.emit("empty-data");
    }
  });

  socket.on("logout", () => {
    let user = socket.handshake.session.userdata;

    if (user) {
      User.updateOne(
        { username: user.username },
        {
          $set: {
            status: "offline"
          }
        },
        err => {
          if (err) {
            socket.emit("on-err", err);
          } else {
            delete socket.handshake.session.userdata;
            delete socket.handshake.session.currentChat;
            socket.handshake.session.save();

            socket.emit("logout-passed");
          }
        }
      );
    } else {
      socket.emit("auth-error");
    }
  });

  socket.on("send-message-all", chatName => {
    let data = JSON.parse(chatName);
    data.currentChat = socket.handshake.session.currentChat;
    data.author = socket.handshake.session.userdata.username;
    let user = socket.handshake.session.userdata;

    if (data.currentChat === "general-chat") {
      if (data.message) {
        if (data.author && user) {
          chatAll.findOne({}, (err, messages) => {
            let new_message = messages.messages;

            new_message.push({ message: data.message, author: data.author });
            if (messages) {
              chatAll.updateOne(
                { _id: ObjectId(messages._id) },
                {
                  $set: {
                    messages: new_message
                  }
                },
                err => {
                  if (err) {
                    socket.emit("on-err", err);
                  } else {
                    socket.broadcast.emit("write-message", data);
                    socket.emit("write-message", data);
                  }
                }
              );
            }
            if (err) {
              socket.emit("on-err", err);
            }
          });
        } else {
          socket.emit("send-message-failed");
        }
      } else {
        socket.emit("empty-message");
      }
    } else {
      socket.emit("send-message-user", data);
    }
  });

  socket.on("user-chats", () => {
    if (socket.handshake.session.userdata) {
      Chat.find(
        {
          $or: [
            { user_1: socket.handshake.session.userdata.username },
            { user_2: socket.handshake.session.userdata.username }
          ]
        },
        (err, chats) => {
          chats.forEach(element => {
            if (element.user_1 === socket.handshake.session.userdata.username) {
              socket.emit("new-chat", {
                chatId: element._id,
                user: element.user_2,
                status: "on-connect"
              });
            } else if (err) {
              socket.emit("on-err", err);
            } else {
              socket.emit("new-chat", {
                chatId: element._id,
                user: element.user_1,
                status: "on-connect"
              });
            }
          });
        }
      );
    } else {
      socket.emit("auth-error");
    }
  });

  socket.on("send-message-user", data => {
    if (data.message) {
      if (socket.handshake.session.currentChat === data.currentChat) {
        if (socket.handshake.session.userdata.username === data.author) {
          Chat.findOne(
            {
              _id: ObjectId(socket.handshake.session.currentChat)
            },
            (err, messages) => {
              let new_message = messages.messages;

              new_message.push({ message: data.message, author: data.author });

              if (messages) {
                Chat.updateOne(
                  { _id: ObjectId(messages._id) },
                  {
                    $set: {
                      messages: new_message
                    }
                  },
                  err => {
                    if (err) {
                      socket.emit("on-err", err);
                    } else {
                      socket.broadcast.emit("write-message", data);
                      socket.emit("write-message", data);
                    }
                  }
                );
              }
              if (err) {
                socket.emit("on-err", err);
              }
            }
          );
        } else {
          socket.emit("auth-err");
        }
      }
    } else {
      socket.emit("empty-message");
    }
  });

  socket.on("set-current-chat", data => {
    socket.handshake.session.currentChat = data;
    socket.handshake.session.save();

    socket.emit("add-class-active", socket.handshake.session.currentChat);
  });

  socket.on("search-user", data => {
    let user = socket.handshake.session.userdata;

    if (socket.handshake.session.userdata.username !== data && user) {
      User.findOne({ username: data }, (err, user) => {
        if (user) {
          Chat.findOne(
            {
              $or: [
                {
                  $and: [
                    { user_1: user.username },
                    { user_2: socket.handshake.session.userdata.username }
                  ]
                },
                {
                  $and: [
                    { user_2: user.username },
                    { user_1: socket.handshake.session.userdata.username }
                  ]
                }
              ]
            },
            (err, chat) => {
              if (chat) {
                socket.emit("new-chat", {
                  chatId: chat._id,
                  user: user.username
                });

                socket.emit("render-chat-window", chat);
              } else {
                let newChat = new Chat({
                  user_1: socket.handshake.session.userdata.username,
                  user_2: user.username,
                  messages: []
                });

                newChat.save((err, _newChat) => {
                  if (err) return console.error(err);
                });

                socket.emit("new-chat", {
                  chatId: newChat._id,
                  user: user.username
                });

                socket.emit("render-chat-window", newChat);
              }

              if (err) {
                socket.emit("on-err", err);
              }
            }
          );

          socket.emit("search-user-passed");
        } else {
          socket.emit("search-user-failed");
        }
        if (err) {
          socket.emit("on-err", err);
        }
      });
    } else {
      socket.emit("auth-err-you");
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Express działa na porcie ${port}`);
});
