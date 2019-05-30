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
                        <div class="judge-pagination">
                            <div @click="decrement">-</div>
                            <div id="pages">{{pagecounter}}/{{limit/3}}</div>
                            <div @click="increment">+</div>
                        </div>
                        <div class="judge add">Dodaj sędziego</div>
                        <div class="judge" v-for="judge in judgespagination" :key="judge.id">{{judge.name}}</div>
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
                judgesall: [],
                judgespagination: [],
                counter: 0,
                pagecounter: 1,
                limit: 0
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

            this.limit = Math.ceil(this.judges.length / 3) * 3;
            this.judgespagination = Array.from(this.judges).slice(0, 3);

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
            },
            renderjudges () {
                return Array.from(this.judges).slice(this.counter, this.counter + 3);
            },
            increment () {
                if (this.counter + 3 < this.limit) {
                    this.counter += 3;
                    this.pagecounter += 1;
                    this.judgespagination = this.renderjudges();
                }
            },
            decrement () {
                if (this.counter > 0) {
                    this.counter -= 3;
                    this.pagecounter -= 1;
                    this.judgespagination = this.renderjudges();
                }
            }
        }
    };
</script>
