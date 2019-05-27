<template>
    <div id="navbar">
        <div class="auth" @click="random">Losuj dane</div>

        <div class="auth" @click="redirect">Zaloguj</div>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        name: "Header",
        methods: {
            redirect () {
                router.push("/auth");
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
