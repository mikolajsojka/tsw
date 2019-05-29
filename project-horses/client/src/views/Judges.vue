<template>
    <div class="judges">
        <div id="change-collection">
            <div @click="decrement">Poprzednia</div>
            <div id="pages">{{pagecounter}}/{{limit/8}}</div>
            <div @click="increment">Następna</div>
        </div>
        <div id="collection">
            <ul>
                <div class="add">Dodaj sędziego</div>
                <li v-for="judge in judges" :key="judge._id" @click="renderjudge(judge)">{{ judge.judge }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Judges",

        data () {
            let alljudges = this.$store.state.judges;
            return {
                counter: 0,
                pagecounter: 1,
                limit: Math.ceil(alljudges.length / 8) * 8,
                judges: Array.from(alljudges).slice(0, 8)
            };
        },
        methods: {
            renderjudge (judge) {
                this.$store.commit("CLICKED", { type: "judge", data: judge });
                router.push(`/judge/${judge._id}`);
            },
            renderjudges () {
                let alljudges = this.$store.state.judges;
                return Array.from(alljudges).slice(this.counter, this.counter + 8);
            },

            increment () {
                if (this.counter + 8 < this.limit) {
                    this.counter += 8;
                    this.pagecounter += 1;
                    this.judges = this.renderjudges();
                }
            },
            decrement () {
                if (this.counter > 0) {
                    this.counter -= 8;
                    this.pagecounter -= 1;
                    this.judges = this.renderjudges();
                }
            }
        }
    };
</script>
