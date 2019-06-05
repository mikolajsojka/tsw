// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3001");
        let horses,
            judges,
            classes;

        renderClasses = () => {
            classes.forEach((element) => {
                if (element.status) {
                    document.getElementById("actual").innerHTML += `<div class="element" id="${element._id}">${element.category}</div>`;
                }
                else {
                    document.getElementById("end").innerHTML += `<div class="element" id="${element._id}">${element.category}</div>`;
                }
            });
        };

        addClass = (data) => {
            document.getElementById("actual").innerHTML += `<div class="element" id="${data._id}">${data.category}</div>`;
        };

        removeClass = (data) => {
            document.getElementById(data).remove();
        };

        socket.on("connect", () => {
            socket.on("addclass", (data) => {
                data.status = false;
                classes.push(data);
                addClass(data);
            });

            socket.on("deleteClass", (data) => {
                let index = classes.findIndex(item => item._id === data);
                classes.slice(index, 1);
                removeClass(data);
            });
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
                renderClasses();
            });
        });
    }
};
