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
                judge: {}
            };
        },
        created () {
            let index = this.$store.state.judges.findIndex(
                item => item._id === this.$route.params.id
            );
            this.judge = this.$store.state.judges[index];
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
                    this.$store.state.classes.forEach((element, index) => {
                        element.committee.forEach((item, index2) => {
                            if (item === this.judge.id) {
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
