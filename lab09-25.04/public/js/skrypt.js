//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */
"use strict";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    let logIn = document.getElementById("log-in");
    let searchUser = document.getElementById("search-user");
    let logOut = document.getElementById("log-out");
    let usernameInput = document.getElementById("username-input");
    let generalChat = document.getElementById("general-chat");
    let messages = document.getElementById("messages");
    let sendMessage = document.getElementById("send-message");

    let socket;

    socket = io.connect(`http://${location.host}`);

    socket.on("connect", () => {
      let user = JSON.parse(window.localStorage.getItem("user"));

      if (user) {
        logIn.style.display = "none";
        logOut.style.display = "flex";
        usernameInput.style.display = "none";
        logOut.innerHTML = `Wyloguj(${user.username})`;
      }

      generalChat.addEventListener("click", () => {
        let user = JSON.parse(window.localStorage.getItem("user"));

        console.log(user);
        if (user) {
          socket.emit("chat-all");
        }
      });

      sendMessage.addEventListener("keypress", function(e) {
        let user = JSON.parse(window.localStorage.getItem("user"));
        if (user) {
          let key = e.which || e.keyCode;
          if (key === 13) {
            let data = { message: sendMessage.value, author: user.username };
            socket.emit("send-message", data);
            sendMessage.value = "";
          }
        } else {
          alert("Musisz się zalogować");
        }
      });

      logIn.addEventListener(
        "click",
        () => {
          if (usernameInput.value) {
            socket.emit("authentication", usernameInput.value);
          } else {
            alert("Musisz podać swój nick");
          }
        },
        false
      );

      logOut.addEventListener(
        "click",
        () => {
          let user = JSON.parse(window.localStorage.getItem("user"));

          if (user) {
            window.localStorage.clear();
            logIn.style.display = "flex";
            logOut.style.display = "none";
            usernameInput.style.display = "flex";
            logOut.innerHTML = "";
            messages.innerHTML = "";

            //odesłanie do serwera żeby zmieniło status na offline
          } else {
            alert("Nie wiem jak, ale próbowałeś mnie oszukać");
          }
        },
        false
      );

      socket.on("authentication-passed", data => {
        window.localStorage.setItem("user", data);

        let user = JSON.parse(window.localStorage.getItem("user"));

        if (user) {
          logIn.style.display = "none";
          logOut.style.display = "flex";
          usernameInput.style.display = "none";
          logOut.innerHTML = `Wyloguj(${user.username})`;

          //prymitywnie bardzo
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
          fill += `<div>${element.author}: ${element.message}</div>`;
        });

        messages.innerHTML = fill;
      });

      socket.on("write-message", data => {
        let message = `<div>${data.author}: ${data.message}</div>`;
        messages.innerHTML += message;
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
    });
  }
};
