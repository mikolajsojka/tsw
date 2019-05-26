<template>
    <div class="main">
        <div class="first-main">Wprowadzaj wyniki</div>
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
        created () {},
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
