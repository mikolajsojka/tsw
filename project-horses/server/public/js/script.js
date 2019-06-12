// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3001");
        let horses,
            judges,
            classes;

        onClick = (data) => {
            document.getElementById(data._id).addEventListener("click", () => {
                console.log("jetsem");
                let classhorses = horses.map((horse) => {
                    if (horse.class === data.number) {
                        return horse;
                    }
                    return 0;
                });

                classhorses = classhorses.filter(el => el !== 0);

                alert(`${JSON.stringify(classhorses)}`);
            });
        };


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

                onClick(data);
            }
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
                classes[index].status = false;
                checkClass(element, index);
                renderClass(element);
            });
        };

        checkClass = (element, index) => {
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
        };

        socket.on("connect", () => {
            socket.emit("getclassesinit");

            socket.on("addclass", (data) => {
                classes.push(data);

                let index = classes.findIndex(item => item._id === data);
                checkClass(data, index);
                renderClass(data, index);
            });

            socket.on("deleteClass", (data) => {
                let index = classes.findIndex(item => item._id === data);
                classes.slice(index, 1);
                removeClass(data);
            });
            socket.on("gethorses", (data) => {
                horses = data;
                console.log("Załadowano kolekcję: konie");
            });

            socket.on("editclass", (data) => {
                editClass(data);
            });

            socket.on("getjudges", (data) => {
                judges = data;

                document.getElementById("actual").innerHTML = "";
                document.getElementById("end").innerHTML = "";

                checkClasses();

                console.log("Załadowano kolekcję: sędziowie");
            });

            socket.on("getclasses", (data) => {
                classes = data;

                socket.emit("gethorsesinit");
                socket.emit("getjudgesinit");

                console.log("Załadowano kolekcję: klasy");
            });
        });
    }
};
