// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3001");

        socket.on("connect", () => {
            socket.emit("getclasseswithhorses");
            socket.emit("getjudges");
            socket.on("getclasseswithhorses", (data) => {
                console.log(data);
            });

            socket.on("getjudges", (data) => {
                console.log(data);
            });
        });
    }
};
