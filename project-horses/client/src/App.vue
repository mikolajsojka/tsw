<template>
    <div id="app">
        <Header/>
        <div id="user">{{this.$store.state.user._id}}</div>
        <router-view/>
    </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        components: {
            Header
        }
    };
</script>
