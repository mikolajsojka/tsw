<template>
    <div class="authorization">
        <Login/>
    </div>
</template>

<script>
    import Login from "../components/Login";
    export default {
        name: "Authorization",
        components: {
            Login
        },
        data () {
            return { msg: "cyk" };
        },
        sockets: {
            "after-connect" (data) {
                this.msg = data;
            }
        }
    };
</script>
