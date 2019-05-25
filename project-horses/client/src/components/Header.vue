<template>
    <div id="navbar">
        <button id="auth" @click="random">Losuj dane</button>
        <button id="check" @click="check">Check</button>
        <router-link to="/auth">
            <button id="auth">Zaloguj</button>
        </router-link>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Header",
        methods: {
            check () {
                let checked = () => {
                    axios
                        .get("http://localhost:3001/user/user")
                        .then(response => {
                            console.log(response.data);
                        }); ;
                };
                checked();
            },

            random () {
                let classes = () => {
                    axios
                        .get("http://localhost:3000/klasy")
                        .then(response => {
                            axios
                                .post("http://localhost:3001/class/randomclasses", {
                                    classes: response.data
                                })
                                .then(response => {
                                    console.log(response.data);
                                })
                                .catch(errors => {
                                    console.log("Wystąpił problem z losowaniem");
                                });
                        })
                        .catch(errors => {
                            console.log("Wystąpił problem z losowaniem");
                        });
                };

                let judges = () => {
                    axios
                        .get("http://localhost:3000/sedziowie")
                        .then(response => {
                            axios
                                .post("http://localhost:3001/judge/randomjudges", {
                                    judges: response.data
                                })
                                .then(response => {
                                    console.log(response.data);
                                })
                                .catch(errors => {
                                    console.log("Wystąpił problem z losowaniem");
                                });
                        })
                        .catch(errors => {
                            console.log("Wystąpił problem z losowaniem");
                        });
                };

                let horses = () => {
                    axios
                        .get("http://localhost:3000/konie")
                        .then(response => {
                            axios
                                .post("http://localhost:3001/horse/randomhorses", {
                                    horses: response.data
                                })
                                .then(response => {
                                    console.log(response.data);
                                })
                                .catch(errors => {
                                    console.log("Wystąpił problem z losowaniem");
                                });
                        })
                        .catch(errors => {
                            console.log("Wystąpił problem z losowaniem");
                        });
                };

                judges();
                horses();
                classes();
            }
        }
    };
</script>
