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
        judges: {}
    },
    mutations: {
        LOGIN (state, user) {
            state.user = user;
        },
        FETCH_HORSES (state, horses) {
            state.horses = horses;
        },
        FETCH_JUDGES (state, judges) {
            state.judges = judges;
        },
        FETCH_CLASSES (state, classes) {
            state.classes = classes;
        }
    },
    getters: {
        user: state => state.user,
        horses: state => state.horses,
        judges: state => state.judges,
        classes: state => state.classes
    },
    actions: {
        LOGIN ({ commit, dispatch }, payload) {
            axios
                .post("http://localhost:3001/user/login", payload)
                .then(response => {
                    commit("LOGIN", response.data);
                    dispatch("FETCH_HORSES");
                    dispatch("FETCH_JUDGES");
                    dispatch("FETCH_CLASSES");

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
