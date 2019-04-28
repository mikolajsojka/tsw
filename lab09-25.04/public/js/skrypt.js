//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */
"use strict";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    let logInButton = document.getElementById("logIn");
    let logOutButton = document.getElementById("logOut");
    let logged = document.getElementById("logged");
    let logPanel = document.getElementById("logPanel");
    let chatroom = document.getElementById("chatroom");
    let messages = document.getElementById("messages");
    let username = document.getElementById("username");
    let send = document.getElementById("send");
    let socket;

    socket = io.connect(`http://${location.host}`);

    socket.on("connect", () => {
      let user = JSON.parse(window.localStorage.getItem("user"));

      if (user) {
        logged.innerHTML = `Zalogowany jako: ${user.username}`;
        logPanel.style.display = "none";
        chatroom.style.display = "flex";
      } else {
        logged.innerHTML = `Niezalogowany`;
      }

      logInButton.addEventListener("click", () => {
        logInButton.style.display = "none";
        logOutButton.style.display = "flex";
        socket.emit("authentication", username.value);

        socket.on("login", data => {
          window.localStorage.setItem("user", data);
          location.reload();
        });
      });

      send.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
          let data = { username: user.username, message: send.value };

          send.value = "";

          socket.emit("message", data);
        }
      });

      socket.on("write", data => {
        let message = `</br><div class="text">${data.username}: ${
          data.message
        }</div>`;
        messages.innerHTML += message;
      });
    });
  }
};
