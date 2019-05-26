<template>
    <div class="judges">
        <div id="change-collection">
            <button @click="decrement">-1</button>
            {{pagecounter}}
            <button @click="increment">+1</button>
        </div>
        <div id="collection">
            <ul>
                <li v-for="judge in judges" :key="judge._id">{{ judge.judge }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
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
