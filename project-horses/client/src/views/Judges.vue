<template>
    <div class="judges">
        <div id="change-collection">
            <div @click="decrement">Poprzednia</div>
            <div id="pages" v-if="limit > 0">{{pagecounter}}/{{limit/8}}</div>
            <div id="pages" v-else>0/0</div>
            <div @click="increment">Następna</div>
        </div>
        <div id="collection">
            <ul>
                <div class="add" @click="addjudge">Dodaj sędziego</div>
                <li v-for="judge in judges" :key="judge._id" @click="renderjudge(judge)">Nr {{judge.id}}. {{ judge.judge }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Judges",

        data () {
            return {
                counter: this.$store.state.counters.judges.counter,
                pagecounter: this.$store.state.counters.judges.pagecounter,
                limit: 0,
                judges: 0
            };
        },
        created () {
            this.$store.commit("FILL_COUNTER_JUDGES");
            this.limit = this.$store.state.counters.judges.limit;
            this.judges = this.$store.state.counters.judges.judges.sort(function (a, b) {
                return a.id - b.id;
            });
        },
        methods: {
            addjudge () {
                router.push("/addjudge");
            },
            renderjudge (judge) {
                router.push(`/judge/${judge._id}`);
            },
            renderjudges () {
                let alljudges = this.$store.state.judges.sort(function (a, b) {
                    return a.id - b.id;
                });
                return alljudges.slice(this.counter, this.counter + 8);
            },

            increment () {
                if (this.counter + 8 < this.limit) {
                    this.counter += 8;
                    this.pagecounter += 1;
                    this.judges = this.renderjudges();
                    this.$store.commit("COUNTER_JUDGES", { counter: this.counter, pagecounter: this.pagecounter });
                }
            },
            decrement () {
                if (this.counter > 0) {
                    this.counter -= 8;
                    this.pagecounter -= 1;
                    this.judges = this.renderjudges();
                    this.$store.commit("COUNTER_JUDGES", { counter: this.counter, pagecounter: this.pagecounter });
                }
            }
        }
    };
</script>
