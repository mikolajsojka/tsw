<template>
    <div class="class">
        <div class="panel">
            <div class="button delete" @click="deleteclass">Usuń Klasę</div>
            <div class="main">
                <div class="info">
                    <div class="first">
                        <label>Nazwa klasy</label>
                        <div class="classname">
                            <div class="number"> Nr {{item.number}}.</div>
                            <input name="name" v-bind:value="item.category" @change="change">
                        </div>
                        <label>Sędziowie</label>
                        <div class="judge-pagination">
                            <div @click="decrement">-</div>
                            <div id="pages" v-if="limit > 0">{{pagecounter}}/{{limit/2}}</div>
                            <div id="pages" v-else>0/0</div>
                            <div @click="increment">+</div>
                        </div>
                        <label>Dodaj sędziego</label>
                        <select name="judges" class="select" id="select" @change="change">
                            <option selected></option>
                            <option v-for="judge in judgesall" :value="judge.id" :key="judge._id">{{judge.judge}}</option>
                        </select>

                        <div class="judge" v-for="judge in judgespagination" :key="judge._id">
                            <div class="name" @click="judgeredirect(judge._id)">{{judge.judge}}</div>
                            <div class="delete" @click="deletejudge(judge.id)">x</div>
                        </div>
                    </div>
                </div>
            </div>
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
            if (this.$store.state.user) {
                this.render();
            } else { router.push("/auth"); }
        },
        methods: {
            judgeredirect (id) {
                router.push(`/judge/${id}`);
            },
            render () {
                let index = this.$store.state.classes.findIndex(
                    item => item._id === this.$route.params.id
                );
                this.item = this.$store.state.classes[index];

                this.$store.state.judges.forEach(judge => {
                    this.item.committee.forEach(item => {
                        if (judge.id === item) {
                            this.judges.push(judge);
                        }
                    });
                    if (
                        this.judgesall.findIndex(jud => jud.id === judge.id) === -1 &&
                        this.judges.findIndex(jud => jud.id === judge.id) === -1
                    ) {
                        this.judgesall.push(judge);
                    }
                });

                this.limit = Math.ceil(this.judges.length / 2) * 2;
                this.judgespagination = Array.from(this.judges).slice(0, 2);
            },
            change ({ target }) {
                let errors = [];
                if (target.name === "name") {
                    if (target.value !== "") {
                        this.item.category = target.value;
                    } else {
                        errors.push("Nazwa klasy nie może być pusta!");
                    }
                }
                if (target.name === "judges") {
                    this.item.committee.push(parseInt(target.value));
                    this.$store.dispatch("ADD_NOTE_JUDGE_FROM_CLASS", {
                        classNumber: this.item.number
                    });

                    let index = this.judgesall.findIndex(
                        item => item.id === parseInt(target.value)
                    );
                    this.judges.push(this.judgesall[index]);
                    this.judgesall.splice(index, 1);
                    this.judgespagination = this.renderjudges();
                    this.limit = Math.ceil(this.judges.length / 2) * 2;
                }

                if (errors.length) {
                    errors.forEach(element => {
                        alert(element);
                    });
                } else {
                    document.getElementById("select").value = "";
                    this.$store.dispatch("EDIT_CLASS", this.item);
                }
            },
            deleteclass () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.$store.state.horses.forEach((element, index) => {
                        if (parseInt(element.class) === parseInt(this.item.number)) {
                            this.$store.commit("AFTER_DELETE_CLASS", {
                                item: this.item,
                                indexhorses: index
                            });
                        }
                    });
                    this.$store.dispatch("DELETE_CLASS", this.$route.params.id);
                    this.$store.commit("FILL_COUNTER_CLASSES");
                    router.push("/classes");
                }
            },
            deletejudge (id) {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.item.committee.forEach((element, index) => {
                        if (element === id) {
                            this.item.committee.splice(index, 1);
                            this.$store.dispatch("DELETE_NOTE_JUDGE_FROM_CLASS", {
                                judge: index,
                                classNumber: this.item.number
                            });
                            let index2 = this.judges.findIndex(item => item.id === id);
                            this.judgesall.push(this.judges[index2]);
                            this.judges.splice(index2, 1);
                            this.judgespagination = this.renderjudges();
                            this.limit = Math.ceil(this.judges.length / 2) * 2;
                            if (this.judgespagination.length === 0) {
                                if (this.pagecounter - 1 > 0) {
                                    this.pagecounter -= 1;
                                    this.counter -= 2;
                                }
                                this.judgespagination = this.renderjudges();
                                this.limit = Math.ceil(this.judges.length / 2) * 2;
                            }
                        }
                        this.$store.dispatch("EDIT_CLASS", this.item);
                    });
                }
            },
            renderjudges () {
                return Array.from(this.judges).slice(this.counter, this.counter + 2);
            },
            increment () {
                if (this.counter + 2 < this.limit) {
                    this.counter += 2;
                    this.pagecounter += 1;
                    this.judgespagination = this.renderjudges();
                }
            },
            decrement () {
                if (this.counter > 0) {
                    this.counter -= 2;
                    this.pagecounter -= 1;
                    this.judgespagination = this.renderjudges();
                }
            }
        }
    };
</script>
