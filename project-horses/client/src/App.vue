<template>
    <div id="app">
        <Header/>
        <div id="routes">
            <div class="route" @click="horses">Konie</div>
            <div class="route" @click="judges">Sędziowie</div>
            <div class="route" @click="classes">Klasy</div>
        </div>
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
        sockets: {
            "checkuser" () {
                this.$socket.emit("checkuser", (this.$store.state.user));
            }
        },
        methods: {
            horses () {
                console.log("click");
                this.$socket.emit("test", {});
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
