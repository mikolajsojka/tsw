<template>
    <div class="class">
        <div class="panel">
            <div class="button save" @click="saveclass">Zatwierdź</div>
            <div class="main">
                <div class="info">
                    <div class="first">
                        <label>Nazwa klasy</label>
                        <input name="name" v-model="item.category" @change="change">
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
                            <option v-for="judge in judgesall" :value="judge.id" :key="judge._id">{{judge.name}}</option>
                        </select>

                        <div class="judge" v-for="judge in judgespagination" :key="judge._id">
                            <div class="name">{{judge.name}}</div>
                            <div class="delete" @click="deletejudge(judge.id)">x</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "AddClass",
        data () {
            return {
                check: 0,
                item: {
                    committee: [],
                    number: "",
                    category: ""
                },
                judges: [],
                judgesall: [],
                judgespagination: [],
                counter: 0,
                pagecounter: 1,
                limit: 0
            };
        },
        created () {
            this.render();
        },
        methods: {
            render () {
                this.$store.state.judges.forEach(judge => {
                    this.judgesall.push({ id: judge.id, name: judge.judge });
                });
                this.limit = Math.ceil(this.judges.length / 2) * 2;
                this.judgespagination = this.judges.slice(0, 2);
            },
            change ({ target }) {
                if (target.name === "name") {
                    if (target.value !== "") {
                        this.item.category = target.value;
                    }
                }
                if (target.name === "judges") {
                    this.item.committee.push(parseInt(target.value));
                    this.judgesall.forEach(element => {
                        if (parseInt(target.value) === element.id) {
                            this.judges.push(element);
                        }
                    });
                    let index = this.judgesall.findIndex(
                        item => item.id === parseInt(target.value)
                    );
                    this.judgesall.splice(index, 1);
                    this.judgespagination = this.renderjudges();
                    this.limit = Math.ceil(this.judges.length / 2) * 2;
                }
                document.getElementById("select").value = "";
            },
            saveclass () {
                if (this.item.category !== "") {
                    this.$store.dispatch("ADD_CLASS", this.item);
                } else {
                    alert("Nie podano nazwy klasy!");
                }
            },
            deletejudge (id) {
                this.item.committee.forEach((element, index) => {
                    if (element === id) {
                        this.item.committee.splice(index, 1);
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
                });
            },
            renderjudges () {
                return this.judges.slice(this.counter, this.counter + 2);
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
