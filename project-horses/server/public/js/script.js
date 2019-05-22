// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3000");

        socket.on("connect", () => {
            socket.on("after-connect", (text) => {
                document.getElementById("socket").innerHTML = text;
            });
        });
    }
};
