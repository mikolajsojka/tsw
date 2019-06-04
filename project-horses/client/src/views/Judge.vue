<template>
    <div class="judge">
        <div class="panel">
            <div class="button delete" @click="deletejudge">Usuń sędziego</div>
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
            change ({ target }) {
                if (target.name === "name") {
                    this.judge.judge = target.value;
                }
                if (target.name === "country") {
                    this.judge.country = target.value;
                }
                this.$store.dispatch("EDIT_JUDGE", this.judge);
            },
            deletejudge () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    Array.from(this.$store.state.classes).forEach((element, index) => {
                        element.committee.forEach((item, index2) => {
                            if (parseInt(item) === parseInt(this.judge.id)) {
                                this.$store.commit("AFTER_DELETE_JUDGE", { judge: this.judge, indexcommittee: index2, indexclasses: index });
                            }
                        });
                    });
                    this.$store.dispatch("DELETE_JUDGE", this.$route.params.id);

                    this.$store.commit("FILL_COUNTER_JUDGES");
                    router.push("/judges");
                }
            }
        }
    };
</script>
