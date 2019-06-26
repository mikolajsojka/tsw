<template>
    <div class="judge">
        <div class="panel">
            <div class="button delete" @click="deletejudge">Usuń sędziego</div>
            <div class="main">
                <div class="info">
                    <div class="first">
                        <label>Imię</label>
                        <input name="name"  @change="change" v-bind:value="judge.judge">
                        <label>Kraj</label>
                        <input name="country"  @change="change" v-bind:value="judge.country">
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
            if (this.$store.state.user) {
                let index = this.$store.state.judges.findIndex(
                    item => item._id === this.$route.params.id
                );
                this.judge = this.$store.state.judges[index];
            } else { router.push("/auth"); }
        },
        methods: {
            change ({ target }) {
                let errors = [];
                if (target.name === "name") {
                    if (target.value !== "") {
                        this.judge.judge = target.value;
                    } else {
                        target.value = this.judge.judge;
                        errors.push("Godność sędziego nie może być pusta!");
                    }
                }
                if (target.name === "country") {
                    if (target.value !== "") {
                        this.judge.country = target.value;
                    } else {
                        target.value = this.judge.country;
                        errors.push("Kraj pochodzenia sędziego nie może być pusty!");
                    }
                }

                if (errors.length) {
                    errors.forEach(element => {
                        alert(element);
                    });
                } else {
                    this.$store.dispatch("EDIT_JUDGE", this.judge);
                }
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
