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
                            <div class="pages">{{pagecounter}}/{{limit/3}}</div>
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
// import router from "../router";
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
                pagecounter: 0,
                limit: 0
            };
        },
        created () {
            this.render();
            if (this.judges.length !== 0) {
                this.pagecounter = 1;
            }
        },
        methods: {
            render () {
                Array.from(this.$store.state.judges).forEach(judge => {
                    this.judgesall.push({ id: judge.id, name: judge.judge });
                });

                this.limit = Math.ceil(this.judges.length / 3) * 3;
                this.judgespagination = Array.from(this.judges).slice(0, 3);
            },
            change ({ target }) {
                if (target.name === "name") {
                    this.item.category = target.value;
                }

                if (target.name === "judges") {
                    this.item.committee.push(parseInt(target.value));

                    Array.from(this.judgesall).forEach(element => {
                        if (parseInt(target.value) === element.id) {
                            this.judges.push(element);
                        }
                    });

                    console.log(this.judges);

                    let index = this.judgesall.findIndex(
                        item => item.id === parseInt(target.value)
                    );
                    this.judgesall.splice(index, 1);

                    this.judgespagination = this.renderjudges();
                    this.limit = Math.ceil(this.judges.length / 3) * 3;

                    if (this.judges.length === 0) {
                        this.pagecounter = 0;
                    }
                }
                document.getElementById("select").value = "";
            },
            saveclass () {},
            deletejudge (id) {
                this.item.committee.forEach((element, index) => {
                    if (element === id) {
                        this.item.committee.splice(index, 1);

                        let index2 = this.judges.findIndex(item => item.id === id);
                        this.judgesall.push(this.judges[index2]);
                        this.judges.splice(index2, 1);
                        this.judgespagination = this.renderjudges();
                        this.limit = Math.ceil(this.judges.length / 3) * 3;

                        if (this.judges.length === 0) {
                            this.pagecounter = 0;
                        }
                    }
                });
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
