import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: "",
        horses: [],
        classes: [],
        judges: [],
        counters: {
            horses: {
                counter: 0,
                pagecounter: 1,
                limit: 0,
                horses: 0
            },
            judges: {
                counter: 0,
                pagecounter: 1,
                limit: 0,
                judges: 0
            },
            classes: {
                counter: 0,
                pagecounter: 1,
                limit: 0,
                classes: 0
            }
        }
    },
    mutations: {
        FILL_COUNTER_HORSES: state => {
            state.counters.horses.limit = Math.ceil(state.horses.length / 8) * 8;
            state.counters.horses.horses = Array.from(state.horses).slice(
                state.counters.horses.counter,
                state.counters.horses.counter + 8
            );

            if (
                typeof state.horses[state.counters.horses.counter] === "undefined" &&
        state.horses.length > 0
            ) {
                state.counters.horses.counter -= 8;
                state.counters.horses.pagecounter -= 1;
            }
        },
        FILL_COUNTER_CLASSES: state => {
            state.counters.classes.limit = Math.ceil(state.classes.length / 8) * 8;
            state.counters.classes.classes = Array.from(state.classes).slice(
                state.counters.classes.counter,
                state.counters.classes.counter + 8
            );

            if (
                typeof state.classes[state.counters.classes.counter] === "undefined" &&
        state.classes.length > 0
            ) {
                state.counters.classes.counter -= 8;
                state.counters.classes.pagecounter -= 1;
            }
        },
        FILL_COUNTER_JUDGES: state => {
            state.counters.judges.limit = Math.ceil(state.judges.length / 8) * 8;
            state.counters.judges.judges = Array.from(state.judges).slice(
                state.counters.judges.counter,
                state.counters.judges.counter + 8
            );

            if (
                typeof state.judges[state.counters.judges.counter] === "undefined" &&
        state.judges.length > 0
            ) {
                state.counters.judges.counter -= 8;
                state.counters.judges.pagecounter -= 1;
            }
        },
        COUNTER_HORSES: (state, payload) => {
            state.counters.horses.counter = payload.counter;
            state.counters.horses.pagecounter = payload.pagecounter;
        },
        COUNTER_JUDGES: (state, payload) => {
            state.counters.judges.counter = payload.counter;
            state.counters.judges.pagecounter = payload.pagecounter;
        },
        COUNTER_CLASSES: (state, payload) => {
            state.counters.classes.counter = payload.counter;
            state.counters.classes.pagecounter = payload.pagecounter;
        },
        ADD_CLASS: (state, payload) => {
            state.classes.push(payload);
            router.push("/classes");
        },
        ADD_HORSE: (state, payload) => {
            state.horses.push(payload);
            router.push("/horses");
        },
        ADD_JUDGE: (state, payload) => {
            state.judges.push(payload);
            router.push("/judges");
        },
        EDIT_CLASS: (state, payload) => {
            let index = state.classes.findIndex(item => item._id === payload._id);
            Vue.set(state.classes, index, payload);
        },
        EDIT_HORSE: (state, payload) => {
            let index = state.horses.findIndex(item => item._id === payload._id);
            console.log(payload);
            Vue.set(state.horses, index, payload);
        },
        EDIT_JUDGE: (state, payload) => {
            let index = state.judges.findIndex(item => item._id === payload._id);
            Vue.set(state.judges, index, payload);
        },
        DELETE_JUDGE: (state, id) => {
            let index = state.judges.findIndex(judge => judge._id === id);
            state.judges.splice(index, 1);

            router.push("/judges");
        },
        DELETE_CLASS: (state, id) => {
            let index = state.classes.findIndex(item => item._id === id);
            state.classes.splice(index, 1);
            router.push("/classes");
        },
        DELETE_HORSE: (state, id) => {
            let index = state.horses.findIndex(horse => horse._id === id);
            state.horses.splice(index, 1);
            router.push("/horses");
        },
        LOGIN (state, user) {
            state.user = user;
        },
        FETCH_HORSES (state, horses) {
            state.horses = horses;
            alert("Załadowano kolekcję: konie");
        },
        FETCH_JUDGES (state, judges) {
            state.judges = judges;
            alert("Załadowano kolekcję: sędziowie");
        },
        FETCH_CLASSES (state, classes) {
            state.classes = classes;
            alert("Załadowano kolekcję: klasy");
        },
        AFTER_DELETE_JUDGE (state, payload) {
            Array.from(state.horses).forEach((element, index) => {
                if (
                    parseInt(element.class) ===
          parseInt(state.classes[payload.indexclasses].number)
                ) {
                    state.horses[index].result.notes.splice(payload.indexcommittee, 1);
                }
            });
            state.classes[payload.indexclasses].committee.splice(
                payload.indexcommittee,
                1
            );
        },
        AFTER_DELETE_CLASS (state, payload) {
            state.horses[payload.indexhorses].class = -1;
            state.horses[payload.indexhorses].result.notes = [];
        }

    },
    getters: {
        user: state => state.user,
        horses: state => state.horses,
        judges: state => state.judges,
        classes: state => state.classes,
        counters: state => state.counters
    },
    actions: {
        ADD_NOTE_JUDGE_FROM_CLASS ({ commit }, payload) {
            axios
                .post("http://localhost:3001/horse/addnote", {
                    cnumber: payload.classNumber
                });
        },
        DELETE_NOTE_JUDGE_FROM_CLASS ({ commit }, payload) {
            axios.post("http://localhost:3001/horse/deletenote", {
                judge: payload.judge,
                cnumber: payload.classNumber
            });
        },
        ADD_HORSE ({ commit }, payload) {
            axios
                .post("http://localhost:3001/horse/add", { item: payload })
                .then(response => {
                    commit("ADD_HORSE", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z dodawaniem konia");
                });
        },
        ADD_CLASS ({ commit }, payload) {
            axios
                .post("http://localhost:3001/class/add", { item: payload })
                .then(response => {
                    commit("ADD_CLASS", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z dodawaniem klasy");
                });
        },
        ADD_JUDGE ({ commit }, payload) {
            axios
                .post("http://localhost:3001/judge/add", { item: payload })
                .then(response => {
                    commit("ADD_JUDGE", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z dodawaniem sędziego");
                });
        },
        EDIT_CLASS ({ commit }, payload) {
            axios
                .post("http://localhost:3001/class/edit", { item: payload })
                .then(response => {
                    commit("EDIT_CLASS", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z edycją klasy");
                });
        },
        EDIT_HORSE ({ commit }, payload) {
            axios
                .post("http://localhost:3001/horse/edit", { item: payload })
                .then(response => {
                    commit("EDIT_HORSE", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z edycją konia");
                });
        },
        EDIT_JUDGE ({ commit }, payload) {
            axios
                .post("http://localhost:3001/judge/edit", { item: payload })
                .then(response => {
                    commit("EDIT_JUDGE", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z edycją sędziego");
                });
        },
        DELETE_HORSE ({ commit }, payload) {
            commit("DELETE_HORSE", payload);

            axios
                .post(`http://localhost:3001/horse/delete/${payload}`)
                .then(response => {})
                .catch(errors => {
                    alert("Wystąpił problem z usuwaniem konia");
                });
        },
        DELETE_JUDGE ({ commit }, payload) {
            commit("DELETE_JUDGE", payload);

            axios
                .post(`http://localhost:3001/judge/delete/${payload}`)
                .then(response => {})
                .catch(errors => {
                    alert("Wystąpił problem z usuwaniem sędziego");
                });
        },
        DELETE_CLASS ({ commit }, payload) {
            commit("DELETE_CLASS", payload);

            axios
                .post(`http://localhost:3001/class/delete/${payload}`)
                .then(response => {})
                .catch(errors => {
                    alert("Wystąpił problem z usuwaniem klasy");
                });
        },
        LOGIN ({ commit }, payload) {
            axios
                .post("http://localhost:3001/user/login", payload)
                .then(response => {
                    commit("LOGIN", response.data);

                    router.push("/main");
                })
                .catch(errors => {
                    alert("Wystąpił problem z zalogowaniem");
                });
        },
        FETCH_HORSES ({ commit }) {
            axios
                .get("http://localhost:3001/horse/gethorses")
                .then(response => {
                    commit("FETCH_HORSES", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z pobraniem koni");
                });
        },
        FETCH_CLASSES ({ commit }) {
            axios
                .get("http://localhost:3001/class/getclasses")
                .then(response => {
                    commit("FETCH_CLASSES", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z pobraniem klas");
                });
        },
        FETCH_JUDGES ({ commit }) {
            axios
                .get("http://localhost:3001/judge/getjudges")
                .then(response => {
                    commit("FETCH_JUDGES", response.data);
                })
                .catch(errors => {
                    alert("Wystąpił problem z pobraniem sędziów");
                });
        },
        RANDOMCLASSES ({ commit }) {
            axios
                .get("http://localhost:3000/klasy")
                .then(response => {
                    axios
                        .post("http://localhost:3001/class/randomclasses", {
                            classes: response.data
                        })
                        .then(response => {
                            commit("FETCH_CLASSES", response.data);
                        })
                        .catch(errors => {
                            alert("Wystąpił problem z losowaniem klas");
                        });
                })
                .catch(errors => {
                    alert("Wystąpił problem z losowaniem klas v2");
                });
        },

        RANDOMHORSES ({ commit }) {
            axios
                .get("http://localhost:3000/konie")
                .then(response => {
                    axios
                        .post("http://localhost:3001/horse/randomhorses", {
                            horses: response.data
                        })
                        .then(response => {
                            commit("FETCH_HORSES", response.data);
                        })
                        .catch(errors => {
                            alert("Wystąpił problem z losowaniem koni");
                        });
                })
                .catch(errors => {
                    alert("Wystąpił problem z losowaniem koni v2");
                });
        },
        RANDOMJUDGES ({ commit }) {
            axios
                .get("http://localhost:3000/sedziowie")
                .then(response => {
                    axios
                        .post("http://localhost:3001/judge/randomjudges", {
                            judges: response.data
                        })
                        .then(response => {
                            commit("FETCH_JUDGES", response.data);
                        })
                        .catch(errors => {
                            alert("Wystąpił problem z losowaniem sędziów");
                        });
                })
                .catch(errors => {
                    alert("Wystąpił problem z losowaniem sędziów v2");
                });
        }
    }
});
