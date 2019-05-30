import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: "",
        horses: {},
        classes: {},
        judges: {},
        clicked: {
            type: "",
            data: {}
        }
    },
    mutations: {
        EDIT_CLASS: (state, payload) => {
            let index = state.classes.findIndex(item => item._id === payload._id);
            state.classes[index] = payload;
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
        CLICKED (state, clicked) {
            state.clicked = clicked;
        },
        LOGIN (state, user) {
            state.user = user;
        },
        FETCH_HORSES (state, horses) {
            state.horses = horses;
            console.log("Załadowano kolekcję: konie");
        },
        FETCH_JUDGES (state, judges) {
            state.judges = judges;
            console.log("Załadowano kolekcję: sędziowie");
        },
        FETCH_CLASSES (state, classes) {
            state.classes = classes;
            console.log("Załadowano kolekcję: klasy");
        }
    },
    getters: {
        user: state => state.user,
        horses: state => state.horses,
        judges: state => state.judges,
        classes: state => state.classes,
        clicked: state => state.clicked
    },
    actions: {
        EDIT_CLASS ({ commit }, payload) {
            commit("EDIT_CLASS", payload);
        },
        DELETE_HORSE ({ commit }, payload) {
            commit("DELETE_HORSE", payload);

            axios
                .post(`http://localhost:3001/horse/delete/${payload}`)
                .then(response => {})
                .catch(errors => {
                    console.log(errors);
                    alert("Wystąpił problem z zalogowaniem");
                });
        },
        DELETE_JUDGE ({ commit }, payload) {
            commit("DELETE_JUDGE", payload);

            axios
                .post(`http://localhost:3001/judge/delete/${payload}`)
                .then(response => {})
                .catch(errors => {
                    console.log(errors);
                    alert("Wystąpił problem z zalogowaniem");
                });
        },
        DELETE_CLASS ({ commit }, payload) {
            commit("DELETE_CLASS", payload);

            axios
                .post(`http://localhost:3001/class/delete/${payload}`)
                .then(response => {})
                .catch(errors => {
                    console.log(errors);
                    alert("Wystąpił problem z zalogowaniem");
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
                    console.log(errors);
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
                    console.log(errors);
                    alert("Wystąpił problem z zalogowaniem");
                });
        },
        FETCH_CLASSES ({ commit }) {
            axios
                .get("http://localhost:3001/class/getclasses")
                .then(response => {
                    commit("FETCH_CLASSES", response.data);
                })
                .catch(errors => {
                    console.log(errors);
                    alert("Wystąpił problem z zalogowaniem");
                });
        },
        FETCH_JUDGES ({ commit }) {
            axios
                .get("http://localhost:3001/judge/getjudges")
                .then(response => {
                    commit("FETCH_JUDGES", response.data);
                })
                .catch(errors => {
                    console.log(errors);
                    alert("Wystąpił problem z zalogowaniem");
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
                            console.log("Wystąpił problem z losowaniem");
                        });
                })
                .catch(errors => {
                    console.log("Wystąpił problem z losowaniem");
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
                            console.log("Wystąpił problem z losowaniem");
                        });
                })
                .catch(errors => {
                    console.log("Wystąpił problem z losowaniem");
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
                            console.log("Wystąpił problem z losowaniem");
                        });
                })
                .catch(errors => {
                    console.log("Wystąpił problem z losowaniem");
                });
        }
    }
});
