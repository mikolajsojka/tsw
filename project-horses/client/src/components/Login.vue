<template>
    <div class="login">
        <form v-on:submit="login">
            <input type="text" name="login">

            <input type="password" name="password">

            <input class="submit" type="submit" value="Zaloguj">
        </form>
    </div>
</template>

<script>
    import router from "../router";
    import axios from "axios";

    export default {
        name: "Login",
        methods: {
            login: e => {
                e.preventDefault();
                let username = document.querySelector("input[name=login]").value;
                let password = document.querySelector("input[name=password]").value;
                let login = () => {
                    let data = {
                        username: username,
                        password: password
                    };
                    axios
                        .post("http://localhost:3000/login", data)
                        .then(response => {
                            console.log("Logged in");
                            // router.push("/");
                        })
                        .catch(errors => {
                            console.log("Cannot log in");
                        });
                };
                login();
            }
        }
    };
</script>
