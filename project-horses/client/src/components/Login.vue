<template>
    <div class="login">
        <form>
            <input v-model="user.username" type="text">

            <input v-model="user.password" type="password">

            <div id="login" @click="login">Zaloguj</div>
        </form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data () {
            return {
                user: {
                    username: "",
                    password: ""
                }
            };
        },
        methods: {
            login () {
                this.$store.dispatch("LOGIN", this.user);
            }
        }
    };
</script>
