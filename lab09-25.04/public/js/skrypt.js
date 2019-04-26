//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */
"use strict";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    let logInButton = document.getElementById("logIn");
    let logOutButton = document.getElementById("logOut");
    let socket;

    logInButton.addEventListener("click", () => {
      logInButton.style.display = "none";
      logOutButton.style.display = "flex";

      socket = io.connect(`http://${location.host}`);

      socket.on("connect", (user="mama") => {
        console.log(`Użytkownik ${user} nawiązał połączenie`);

        socket.emit('login', user);

      });
    });
  }
};
