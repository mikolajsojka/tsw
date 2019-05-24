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
                        .post("http://localhost:3001/login", this.user)
                        .then(response => {
                            console.log("Zalogowano");
                            // router.push("/");
                        })
                        .catch(errors => {
                            console.log("Wystąpił problem z zalogowaniem");
                        });
                };

                login();
            }
        }
    };
</script>
