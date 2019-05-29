<template>
    <div id="judge">
        <div class="panel">
            <div class="button delete" @click="deletejudge">Usuń sędziego</div>
            <div class="main" ><div id="info">
                <div id="first">
                    <label>Imię</label>
                    <input name="name" v-model="judge.judge"/>
                    <label>Kraj</label>
                    <input name="country" v-model="judge.country"/>
                </div>

            </div></div>
            <div class="button">Zatwierdź</div>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Judge",
        data () {
            return {
                check: 0,
                judge: {}
            };
        },
        created () {
            Array.from(this.$store.state.judges).forEach(element => {
                if (element._id === this.$route.params.id) {
                    this.check = 1;
                    this.judge = element;
                }
            });
            if (this.check === 0) {
                router.push("/main");
                alert("Nie znaleziono takiego sędziego");
            }
        },
        methods: {
            deletejudge () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.$store.dispatch("DELETE_JUDGE", this.$route.params.id);
                }
            }

        }
    };
</script>
