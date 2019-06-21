<template>
    <div class="judge">
        <div class="panel">
            <div class="button save" @click="savejudge">Zatwierdź</div>
            <div class="main">
                <div class="info">
                    <div class="first">
                        <label>Imię</label>
                        <input name="name" v-model="judge.judge" @change="change">
                        <label>Kraj</label>
                        <input name="country" v-model="judge.country" @change="change">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import router from "../router";
    export default {
        name: "Judge",
        data () {
            return {
                check: 0,
                judge: {
                    judge: "",
                    country: ""
                }
            };
        },
        methods: {
            savejudge () {
                let errors = [];

                if (this.judge.judge === "") {
                    errors.push("Nie podano godności sędziego!");
                }

                if (this.judge.country === "") {
                    errors.push("Nie podano kraju pochodzenia sędziego!");
                }

                if (errors.length) {
                    errors.forEach(element => {
                        alert(element);
                    });
                } else {
                    this.$store.dispatch("ADD_JUDGE", this.judge);
                }
            },
            change ({ target }) {
                if (target.name === "name") {
                    if (target.value !== "") {
                        this.judge.judge = target.value;
                    }
                }
                if (target.name === "country") {
                    if (target.value !== "") {
                        this.judge.country = target.value;
                    }
                }
            }
        }
    };
</script>
