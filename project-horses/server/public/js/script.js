// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3001");
        let horses,
            judges,
            classes;

        renderClass = (data) => {
            if (data.status) {
                document.getElementById(
                    "actual"
                ).innerHTML += `<div class="element" id="${data._id}">${
                    data.category
                }</div>`;
            }
            else {
                document.getElementById(
                    "end"
                ).innerHTML += `<div class="element" id="${data._id}">${
                    data.category
                }</div>`;
            }
        };

        addClass = (data) => {
            document.getElementById(
                "actual"
            ).innerHTML += `<div class="element" id="${data._id}">${
                data.category
            }</div>`;
        };

        removeClass = (data) => {
            document.getElementById(data).remove();
        };

        editClass = (data) => {
            document.getElementById(data._id).innerHTML = `<div class="element" id="${
                data._id
            }">${data.category}</div>`;
        };

        checkClasses = () => {
            classes.forEach((element, index) => {
                checkClass(element, index);
            });
        };

        checkClass = (element, index) => {
            classes[index].status = false;
            horses.forEach((horse) => {
                if (horse.class === element.number) {
                    horse.result.notes.forEach((note) => {
                        if (
                            note.htype === null
          || note.head === null
          || note.barell === null
          || note.legs === null
          || note.move === null
                        ) {
                            classes[index].status = true;
                        }
                    });
                }
            });

            renderClass(element);
        };

        socket.on("connect", async () => {
            await socket.emit("getclassesinit");

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
            });

            socket.on("getjudges", (data) => {
                judges = data;

                document.getElementById("actual").innerHTML = "";
                document.getElementById("end").innerHTML = "";

                checkClasses();
            });

            socket.on("getclasses", async (data) => {
                classes = data;

                await socket.emit("gethorsesinit");
                socket.emit("getjudgesinit");
            });
        });
    }
};
