// jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const socket = io.connect("http://localhost:3001");
        let horses,
            judges,
            classes,
            classhorses,
            clickedClass;

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

        points = (horse) => {
            let aresult = 0;
            horse.result.notes.forEach((note) => {
                if (note.htype !== null) {
                    aresult += parseInt(note.htype);
                }
                if (note.move !== null) {
                    aresult += parseInt(note.move);
                }
            });

            return aresult;
        };


        sorting = () => {
            classhorses.sort((a, b) => {
                let aresult = 0;
                let bresult = 0;

                let ahtype = 0;
                let amresult = 0;
                let bhtype = 0;
                let bmresult = 0;

                a.result.notes.forEach((note) => {
                    if (note.htype !== null) {
                        aresult += parseInt(note.htype);
                        ahtype += parseInt(note.htype);
                    }
                    if (note.move !== null) {
                        aresult += parseInt(note.move);
                        amresult += parseInt(note.move);
                    }
                });

                b.result.notes.forEach((note) => {
                    if (note.htype !== null) {
                        bresult += parseInt(note.htype);
                        bhtype += parseInt(note.htype);
                    }
                    if (note.move !== null) {
                        bresult += parseInt(note.move);
                        bmresult += parseInt(note.move);
                    }
                });

                if (aresult === bresult) {
                    if (ahtype === bhtype) {
                        if (amresult === bmresult) {
                            if (bresult !== 0) {
                                this.arbitrator.push(b._id);
                            }
                            if (aresult !== 0) {
                                this.arbitrator.push(a._id);
                            }
                            return a.result.arbitrator - b.result.arbitrator;
                        }
                        return bmresult - amresult;
                    }
                    return bhtype - ahtype;
                }
                return bresult - aresult;
            });
            podium();
        };

        podium = () => {
            let index = classes.findIndex(item => item.number === clickedClass);
            let podium = "";
            classhorses.forEach((element) => {
                podium += `<div class="item" id=${element._id}>${element.name} - ${points(element)} pkt.</div>`;
            });
            document.getElementById("classname").innerHTML = `${index + 1}/${classes.length}. ${classes[index].category}`;
            document.getElementById("podium").innerHTML = podium;
        };

        clickEvents = () => {
            let classeshtml = document.getElementsByClassName("element");

            Array.from(classeshtml).forEach((elem) => {
                elem.addEventListener("click", () => {
                    let index = classes.findIndex(item => item._id === elem.id);

                    classhorses = horses.map((horse) => {
                        if (horse.class === classes[index].number) {
                            return horse;
                        }
                        return 0;
                    });

                    classhorses = classhorses.filter(el => el !== 0);

                    document.getElementById("classes").style.display = "none";
                    document.getElementById("selected").style.display = "flex";
                    document.getElementById("classname").style.display = "flex";
                    clickedClass = classes[index].number;
                    sorting();
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

            socket.on("editnotes", (data) => {
                let index = horses.findIndex(item => item._id === data._id);
                let index1 = classes.findIndex(item => item.number === data.class);
                horses[index] = data;
                let index2 = classhorses.findIndex(item => item._id === data._id);
                classhorses[index2] = data;
                sorting();
                let oldstatus = classes[index1].status;
                checkClass(classes[index1], index1);

                if (oldstatus !== classes[index1].status) {
                    document.getElementById(classes[index1]._id).remove();

                    if (!classes[index1].status) {
                        renderClassFalse(classes[index1]);
                    }
                    else {
                        renderClassTrue(classes[index1]);
                    }
                    clickEvents();
                }
            });

            socket.on("addhorse", (data) => {
                horses.push(data);
                if (clickedClass === data.class) {
                    try {
                        classhorses.push(data);
                        sorting();
                    }
                    catch (e) {}
                }
            });

            socket.on("edithorse", (data) => {
                let index = horses.findIndex(item => item._id === data._id);
                let actualclass = horses[index].class;
                horses[index] = data;

                if (clickedClass === horses[index].class) {
                    try {
                        classhorses.push(horses[index]);
                        sorting();
                    }
                    catch (e) {}
                }
                else {
                    try {
                        let index2 = classhorses.findIndex(item => item._id === data._id);
                        classhorses.splice(index2, 1);
                        sorting();
                    }
                    catch (e) {}
                }

                if (actualclass !== data.class) {
                    let index1 = classes.findIndex(item => item.number === actualclass);
                    let index2 = classes.findIndex(item => item.number === data.class);
                    let oldstatus = classes[index2].status;
                    let oldstatus1 = classes[index1].status;
                    checkClass(classes[index1], index1);
                    checkClass(classes[index2], index2);

                    if (oldstatus !== classes[index2].status) {
                        document.getElementById(classes[index2]._id).remove();
                        if (!classes[index2].status) {
                            renderClassFalse(classes[index2]);
                        }
                        else {
                            renderClassTrue(classes[index2]);
                        }
                    }

                    if (oldstatus1 !== classes[index1].status) {
                        document.getElementById(classes[index1]._id).remove();
                        if (!classes[index1].status) {
                            renderClassFalse(classes[index1]);
                        }
                        else {
                            renderClassTrue(classes[index1]);
                        }
                    }
                }
                clickEvents();
            });

            socket.on("deletehorse", (data) => {
                let index = horses.findIndex(item => item._id === data);
                let index1 = classes.findIndex(
                    item => item.number === horses[index].class
                );

                if (horses[index].class === clickedClass) {
                    try {
                        let index2 = classhorses.findIndex(item => item._id === data);
                        classhorses.splice(index2, 1);
                        sorting();
                    }
                    catch (e) {}
                }
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

                let index = classes.findIndex(item => item._id === data._id);
                checkClass(classes[index], index);
                if (classes[index].status) {
                    renderClassTrue(classes[index]);
                }
                else {
                    renderClassFalse(classes[index]);
                }
                clickEvents();
            });

            socket.on("deleteClass", (data) => {
                let index = classes.findIndex(item => item._id === data);
                classes.slice(index, 1);
                removeClass(data);

                // aktualną zamknąć
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
