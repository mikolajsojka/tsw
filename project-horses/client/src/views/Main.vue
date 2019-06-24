<template>
    <div class="main">
        <div class="second-main">
            <div class="main-button" @click="horseredirect">Konie</div>
            <div class="main-button" @click="judgesredirect">Sędziowie</div>
            <div class="main-button" @click="classesredirect">Klasy</div>
        </div>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        name: "Main",
        created () {
            if (!this.$store.state.user) { router.push("/auth"); }
        },
        methods: {
            horseredirect () {
                router.push("/horses");
            },
            classesredirect () {
                router.push("/classes");
            },
            judgesredirect () {
                router.push("/judges");
            }
        }
    };
</script>
