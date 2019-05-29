<template>
    <div id="class">
        <div class="panel">
            <div class="button delete" @click="deleteclass">Usuń Klasę</div>
            <div class="main">
                <div id="info">
                    <div id="first">
                        <label>Nazwa klasy</label>
                        <input name="name" v-model="item.category" @change="change">
                        <label>Sędziowie</label>

                        <ul>
                            <li v-for="judge in judges" :key="judge.id">{{judge.name}}</li>
                        </ul>
                        <button>Dodaj sędziego</button>
                    </div>
                </div>
            </div>
            <div class="button">Zatwierdź</div>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Class",
        data () {
            return {
                check: 0,
                item: {},
                judges: [],
                judgesall: []
            };
        },
        created () {
            Array.from(this.$store.state.classes).forEach(element => {
                if (element._id === this.$route.params.id) {
                    this.check = 1;
                    this.item = element;
                    Array.from(this.$store.state.judges).forEach(judge => {
                        element.committee.forEach(item => {
                            if (judge.id === item) {
                                this.judges.push({ id: judge.id, name: judge.judge });
                            }
                        });

                        this.judgesall.push({ id: judge.id, name: judge.judge });
                    });
                }
            });

            console.log(this.judgesall);
            if (this.check === 0) {
                router.push("/main");
                alert("Nie znaleziono takiej klasy");
            }
        },
        methods: {
            change ({ target }) {
                if (target.name === "name") {
                    this.item.category = target.value;
                }
            },
            deleteclass () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.$store.dispatch("DELETE_CLASS", this.$route.params.id);
                } else {
                }

                this.deletecheck = 1;
            }
        }
    };
</script>
