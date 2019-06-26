<template>
    <div id="navbar">
        <div class="auth" @click="random">Losuj dane</div>
        <a :href="hostname"><div class="auth">Panel Kibica</div></a>
        <div id="check" v-html="check()" class="auth" @click="redirect"></div>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        name: "Header",
        data () {
            return { action: "login", hostname: `http://${window.location.hostname}:3001` };
        },
        methods: {
            redirect () {
                router.push("/auth");

                if (this.action === "login") {
                    this.$store.dispatch("LOGIN");
                }
                if (this.action === "logout") {
                    this.$store.dispatch("LOGOUT");
                }
            },
            check () {
                if (this.$store.state.user) {
                    this.action = "logout";
                    return "Wyloguj";
                } else {
                    this.action = "login";
                    return "Zaloguj";
                }
            },

            random () {
                if (this.$store.state.user) {
                    this.$store.dispatch("RANDOMCLASSES");
                    this.$store.dispatch("RANDOMHORSES");
                    this.$store.dispatch("RANDOMJUDGES");
                } else {
                    alert("Najpierw się zaloguj!");
                }
                router.push("/main");
            }
        }
    };
</script>
