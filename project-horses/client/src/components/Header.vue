<template>
    <div id="navbar">
        <div class="auth" @click="random">Losuj dane</div>

        <div id="check" v-html="check()" class="auth" @click="redirect"></div>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        name: "Header",
        data () {
            return { action: "login" };
        },
        methods: {
            redirect () {
                if (this.action === "login") {
                    router.push("/auth");
                }
                if (this.action === "logout") {
                    console.log("Tu będzie akcja wylogowania użytkownika");
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
                this.$store.dispatch("RANDOMCLASSES");
                this.$store.dispatch("RANDOMHORSES");
                this.$store.dispatch("RANDOMJUDGES");
                router.push("/main");
            }
        }
    };
</script>
