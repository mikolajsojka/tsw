//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */
"use strict";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    let socket,
      wartownik = "";

    socket = io.connect(`http://${location.host}`);

    socket.on("connect", () => {
      socket.on("after-connect", () => {
        if (
          document.getElementById("hour").value &&
          document.getElementById("minutes").value &&
          !wartownik
        ) {
          let data = {
            hours: document.getElementById("hour").value,
            minutes: document.getElementById("minutes").value
          };
          wartownik = "test";
          socket.emit("set-alarm", data);
        }
      });

      socket.on("get-time", data => {
        document.getElementById("time").innerHTML = data.time;
      });

      socket.on("play-sound", () => {
        var audio = new Audio("/sound/budzik.mp3");
        audio.play();

        document.getElementById("pause").addEventListener(
          "click",
          () => {
            audio.pause();
          },
          false
        );
      });
    });
  }
};
