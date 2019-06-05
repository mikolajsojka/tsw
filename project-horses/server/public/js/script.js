// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3001");
        let horses,
            judges,
            classes;

        generate = () => {
            classes.forEach((element) => {
                if (element.status) {
                    document.getElementById("actual").innerHTML += `<div id="${element._id}">${element.category}</div>`;
                }
                else {
                    document.getElementById("end").innerHTML += `<div id="${element._id}">${element.category}</div>`;
                }
            });
        };

        socket.on("connect", () => {
            socket.on("gethorses", (data) => {
                horses = data;
                console.log(`Konie:${horses}`);
            });

            socket.on("getjudges", (data) => {
                judges = data;
                console.log(data);
            });

            socket.on("getclasses", (data) => {
                classes = data;
                classes.forEach((element, index) => {
                    classes[index].status = true;
                    horses.forEach((horse) => {
                        if (horse.class === element.number) {
                            horse.result.notes.forEach((note) => {
                                if (note.htype === null || note.head === null || note.barell === null || note.legs === null || note.move === null) {
                                    classes[index].status = false;
                                }
                            });
                        }
                    });
                });
                generate();
            });
        });
    }
};
