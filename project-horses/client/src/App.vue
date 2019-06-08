<template>
    <div id="app">
        <Header/>
        <div id="routes">
            <div class="route" @click="horses">Konie</div>
            <div class="route" @click="judges">Sędziowie</div>
            <div class="route" @click="classes">Klasy</div>
        </div>
        <div id="user">{{this.$store.state.user._id}}</div>
        <router-view/>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import router from "./router";

    export default {
        components: {
            Header
        },
        methods: {
            horses () {
                router.push("/horses");
            },
            judges () {
                router.push("/judges");
            },
            classes () {
                router.push("/classes");
            }
        }
    };
</script>
