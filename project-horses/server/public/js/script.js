// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3001");
        let horses,
            judges,
            classes;

        renderClassTrue = (data) => {
            document.getElementById(
                "actual"
            ).innerHTML += `<div class="element" id="${data._id}">Nr ${
                data.number
            }. ${data.category}</div>`;
        };

        renderClassFalse = (data) => {
            document.getElementById("end").innerHTML += `<div class="element" id="${
                data._id
            }">Nr ${data.number}. ${data.category}</div>`;
        };

        removeClass = (data) => {
            document.getElementById(data).remove();
        };

        editClass = (data) => {
            document.getElementById(data._id).innerHTML = `<div class="element" id="${
                data._id
            }">${data.category}</div>`;
        };

        clickEvents = () => {
            let classeshtml = document.getElementsByClassName("element");

            Array.from(classeshtml).forEach((elem) => {
                elem.addEventListener("click", () => {
                    let index = classes.findIndex(item => item._id === elem.id);

                    let classhorses = horses.map((horse) => {
                        if (horse.class === classes[index].number) {
                            return horse;
                        }
                        return 0;
                    });

                    classhorses = classhorses.filter(el => el !== 0);

                    let information = [];

                    classhorses.forEach((element) => {
                        information.push({ result: element.result });
                    });

                    alert(`${JSON.stringify(information)}`);
                });
            });
        };

        checkClasses = () => {
            classes.forEach((element, index) => {
                classes[index].status = false;
                checkClass(element, index);

                if (element.status) {
                    renderClassTrue(element);
                }
                else {
                    renderClassFalse(element);
                }
            });

            clickEvents();
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
        };

        socket.on("connect", () => {
            socket.emit("getclassesinit");

            socket.on("addhorse", (data) => {
                horses.push(data);
            });

            socket.on("edithorse", (data) => {
                let index = horses.findIndex(item => item._id === data._id);
                let actualclass = horses[index].class;
                horses[index] = data;

                if (actualclass !== data.class) {
                    let index1 = classes.findIndex(item => item.number === actualclass);
                    let index2 = classes.findIndex(item => item.number === data.class);
                    checkClass(classes[index1], index1);
                    document.getElementById(classes[index1]._id).remove();
                    checkClass(classes[index2], index2);
                    document.getElementById(classes[index2]._id).remove();

                    if (!classes[index2].status) {
                        renderClassFalse(classes[index2]);
                    }
                    else {
                        renderClassTrue(classes[index2]);
                    }

                    if (!classes[index1].status) {
                        renderClassFalse(classes[index1]);
                    }
                    else {
                        renderClassTrue(classes[index1]);
                    }

                    clickEvents();
                }

                console.log("edytowanie konia");
            });

            socket.on("deletehorse", (data) => {
                let index = horses.findIndex(item => item._id === data);
                let index1 = classes.findIndex(item => item.number === horses[index].class);
                horses.splice(index, 1);

                checkClass(classes[index1], index1);

                if (!classes[index1].status) {
                    document.getElementById(classes[index1]._id).remove();
                    renderClassFalse(classes[index1]);

                    clickEvents();
                }
                console.log("usuwanie konia");
            });

            socket.on("addclass", (data) => {
                classes.push(data);

                let index = classes.findIndex(item => item._id === data);
                checkClass(data, index);
                if (element.status) {
                    renderClassTrue(element);
                }
                else {
                    renderClassFalse(element);
                }
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
