<template>
    <div class="login">
        <form>
            <input v-model="user.username" type="text">

            <input v-model="user.password" type="password">

            <button @click="login">Zaloguj</button>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    import router from "../router";

    export default {
        name: "Login",
        data () {
            return {
                user: {
                    username: "",
                    password: ""
                }
            };
        },
        methods: {
            login () {
                let login = () => {
                    axios
                        .post("http://localhost:3001/user/login", this.user)
                        .then(response => {
                            this.$store.commit("USER", response.data);
                            router.push("/main");
                        })
                        .catch(errors => {
                            alert("Wystąpił problem z zalogowaniem");
                        });
                };

                login();
            }
        }
    };
</script>
