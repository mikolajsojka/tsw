// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3001");

        socket.on("connect", () => {
            socket.emit("write", "Witam w świecie socketów");
            // socket.broadcast("write", "Witam w świecie socketów");
        });
    }
};
