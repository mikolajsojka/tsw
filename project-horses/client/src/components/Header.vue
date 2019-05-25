<template>
    <div id="navbar">
        <button class="auth" @click="random">Losuj dane</button>

        <button class="auth" @click="redirect">Zaloguj</button>
    </div>
</template>

<script>
    import router from "../router";
    import axios from "axios";
    export default {
        name: "Header",
        methods: {
            redirect () {
                router.push("/auth");
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
