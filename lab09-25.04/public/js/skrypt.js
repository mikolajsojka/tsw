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
    let chats = document.getElementById("chats-all");
    let chatsElse = document.getElementById("chats-else");

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
          socket.emit("user-chats");
        }

        if (currentChat) {
          socket.emit("chat-all", currentChat);
        }
      });

      sendMessage.addEventListener("keypress", e => {
        let key = e.which || e.keyCode;
        if (key === 13) {
          let data = {
            message: sendMessage.value
          };
          socket.emit("send-message-all", JSON.stringify(data));
          sendMessage.value = "";

          document.getElementById(
            "actual-chat-messages"
          ).scrollTop = document.getElementById(
            "actual-chat-messages"
          ).scrollHeight;
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
        chatsElse.innerHTML = "";

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
          chats.innerHTML += `<div id="general-chat" class="active-chats">Wszyscy</div>`;
          socket.emit("user-chats");

          let generalChat = document.getElementById("general-chat");

          generalChat.addEventListener("click", () => {
            socket.emit("set-current-chat", "general-chat");
            socket.emit("chat-all", "general-chat");
          });
        }
      });

      searchUser.addEventListener("keypress", e => {
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

        document.getElementById(
          "actual-chat-messages"
        ).scrollTop = document.getElementById(
          "actual-chat-messages"
        ).scrollHeight;
      });

      socket.on("write-message", data => {
        let message = `<div class="message">${data.author}: ${
          data.message
        }</div>`;
        messages.innerHTML += message;
      });

      socket.on("new-chat", data => {
        let chatElse = document.getElementById("chats-else");
        chatElse.innerHTML += `<div id="${
          data.chatId
        }" class="active-chats users-chats">${data.user}</div>`;

        let newChats = document.getElementsByClassName("users-chats");

        if (data.status) {
          socket.emit("set-current-chat", "general-chat");
        } else {
          socket.emit("set-current-chat", data.chatId);
        }

        Array.from(newChats).forEach(element => {
          element.addEventListener(
            "click",
            () => {
              socket.emit("set-current-chat", element.getAttribute("id"));
              socket.emit("render-chat", element.getAttribute("id"));
            },
            false
          );
        });
      });

      socket.on("add-class-active", data => {
        let elseChats = document.getElementsByClassName("users-chats");

        Array.from(elseChats).forEach(element => {
          element.style.backgroundColor = " rgb(247, 217, 162)";
        });

        document.getElementById("general-chat").style.backgroundColor =
          " rgb(247, 217, 162)";

        if (data === "general-chat") {
          document.getElementById("general-chat").style.backgroundColor =
            "rgb(95, 90, 90)";
        } else {
          document.getElementById(`${data}`).style.backgroundColor =
            "rgb(95, 90, 90)";
        }
      });

      socket.on("render-chat-window", chat => {
        let fill = "";

        chat.messages.forEach(element => {
          fill += `<div class="message">${element.author}: ${
            element.message
          }</div>`;
        });

        messages.innerHTML = fill;
      });

      socket.on("send-message-user", data => {
        socket.emit("send-message-user", data);
      });

      socket.on("empty-chat-all", currentChat => {
        socket.emit("set-current-chat", "general-chat");
        socket.emit("chat-all", currentChat);
      });

      socket.on("chat-all-fill-failed", () => {
        alert("Brak wiadomości.");
      });

      socket.on("search-user-passed", () => {});

      socket.on("auth-err",()=>{
        alert("Ty to nie Ty.");
      });

      socket.on("not-found",()=>{
        alert("Nie znaleziono.");
      });

      socket.on("empty-data",()=>{
        alert("Data jest puste.");
      });

      socket.on("auth-error",()=>{
        alert("Nie byłeś zalogowany.");
      });

      socket.on("auth-err-you",()=>{
        alert("Nie możesz tworzyć czatów sam ze sobą.");
      });

      socket.on("search-user-failed", () => {
        alert("Nie znaleziono takiego użytkownika");
      });

      socket.on("authentication-failed", () => {
        alert("Login jest obecnie zajęty.");
      });

      socket.on("empty-message", () => {
        alert("Pusta wiadomość.");
      });

      socket.on("send-message-failed", () => {
        alert("Coś poszło nie tak.");
      });

      socket.on("err", ()=>{
        alert(err);
      });
    });
  }
};
