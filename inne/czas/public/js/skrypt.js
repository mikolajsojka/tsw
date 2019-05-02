//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */
"use strict";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    let socket;

    socket = io.connect(`http://${location.host}`);

    socket.on("connect", () => {
      socket.on("get-time", data => {
        document.getElementById("time").innerHTML = data;
      });
    });
  }
};
