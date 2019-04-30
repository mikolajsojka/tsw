//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */
"use strict";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    let logIn = document.getElementById("log-in");
    let searchUser = document.getElementById("search-user");
    let logOut = document.getElementById("log-out");
    let usernameInput = document.getElementById("username-input");
    let messages = document.getElementById("messages");
    let sendMessage = document.getElementById("send-message");
    let chatUi = document.getElementById("chat-ui");
    let chats = document.getElementById("chats");

    let socket, user, currentChat;

    socket = io.connect(`http://${location.host}`);

    socket.on("connect", () => {
      socket.emit("on-connect");
      socket.emit("chat-all");

      socket.on("after-connect", data => {
        user = data.user;
        currentChat = data.currentChat;

        if (user) {
          logIn.style.display = "none";
          logOut.style.display = "flex";
          usernameInput.style.display = "none";
          logOut.innerHTML = `Wyloguj(${user.username})`;
          chatUi.style.display = "flex";
          chats.innerHTML = `<div id="general-chat" class="active-chats">Wszyscy</div>`;
        } else {
          chatUi.style.display = "none";
        }

        if (currentChat) {
          socket.emit("chat-all", currentChat);
        }
      });

      sendMessage.addEventListener("keypress", function(e) {
        let key = e.which || e.keyCode;
        if (key === 13) {
          let data = {
            message: sendMessage.value
          };
          socket.emit("send-message", data);
          sendMessage.value = "";
        }
      });

      logIn.addEventListener(
        "click",
        () => {
          if (usernameInput.value) {
            socket.emit("authentication", usernameInput.value);
            usernameInput.value = "";
          } else {
            alert("Musisz podać swój nick");
          }
        },
        false
      );

      logOut.addEventListener(
        "click",
        () => {
          socket.emit("logout");
        },
        false
      );

      socket.on("logout-passed", () => {
        logIn.style.display = "flex";
        logOut.style.display = "none";
        usernameInput.style.display = "flex";
        logOut.innerHTML = "";
        messages.innerHTML = "";
        chats.innerHTML = "";

        //Coś wykminić żeby alert się pokazał po ukryciu
        alert("Wylogowano");

        chatUi.style.display = "none";
      });

      socket.on("authentication-passed", data => {
        let user = JSON.parse(data);

        if (user) {
          logIn.style.display = "none";
          logOut.style.display = "flex";
          usernameInput.style.display = "none";
          logOut.innerHTML = `Wyloguj(${user.username})`;
          chatUi.style.display = "flex";
          chats.innerHTML = `<div id="general-chat" class="active-chats">Wszyscy</div>`;
          //prymitywnie bardzo

          let generalChat = document.getElementById("general-chat");

          generalChat.addEventListener("click", () => {
            let currentChat = "general-chat";

            console.log(currentChat);
            if (currentChat) {
              socket.emit("chat-all", currentChat);
            }
            //on failed
          });
        }
      });

      searchUser.addEventListener("keypress", function(e) {
        let key = e.which || e.keyCode;
        if (key === 13) {
          socket.emit("search-user", searchUser.value);
          searchUser.value = "";
        }
      });

      socket.on("chat-all-fill-passed", data => {
        let fill = "";

        JSON.parse(data).forEach(element => {
          fill += `<div class="message">${element.author}: ${
            element.message
          }</div>`;
        });

        messages.innerHTML = fill;
      });

      socket.on("write-message", data => {
        let message = `<div class="message">${data.author}: ${
          data.message
        }</div>`;
        messages.innerHTML += message;
      });

      socket.on("empty-chat-all", (currentChat) => {
        socket.emit("chat-all",currentChat);
      });

      socket.on("chat-all-fill-failed", () => {
        console.log("Brak wiadomości");
      });

      socket.on("search-user-passed", () => {
        console.log("Znaleziono takiego użytkownika");
      });

      socket.on("search-user-failed", () => {
        console.log("Nie znaleziono takiego użytkownika");
      });

      socket.on("authentication-failed", () => {
        alert("Login jest obecnie zajęty");
      });

      socket.on("send-message-failed", () => {
        alert("Nie wybrałeś żadnego czatu");
      });
    });
  }
};
