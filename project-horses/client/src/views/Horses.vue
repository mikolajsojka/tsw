<template>
    <div class="horses">
        <div id="change-collection">
            <div @click="decrement">Poprzednia</div>
            <div id="pages" v-if="limit > 0">{{pagecounter}}/{{limit/8}}</div>
            <div id="pages" v-else>0/0</div>
            <div @click="increment">Następna</div>
        </div>
        <div id="collection">
            <ul>
                <div class="add" @click="addhorse">Dodaj konia</div>
                <li v-for="horse in horses" :key="horse._id" @click="renderhorse(horse)">{{ horse.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Horses",

        data () {
            return {
                counter: this.$store.state.counters.horses.counter,
                pagecounter: this.$store.state.counters.horses.pagecounter,
                limit: 0,
                horses: 0
            };
        },
        created () {
            this.$store.commit("FILL_COUNTER_HORSES");
            this.limit = this.$store.state.counters.horses.limit;
            this.horses = this.$store.state.counters.horses.horses;
        },
        methods: {
            addhorse () {
                router.push("/addhorse");
            },
            renderhorse (horse) {
                router.push(`/horse/${horse._id}`);
            },
            renderhorses () {
                let allhorses = this.$store.state.horses;
                return Array.from(allhorses).slice(this.counter, this.counter + 8);
            },

            increment () {
                if (this.counter + 8 < this.limit) {
                    this.counter += 8;
                    this.pagecounter += 1;
                    this.horses = this.renderhorses();
                    this.$store.commit("COUNTER_HORSES", { counter: this.counter, pagecounter: this.pagecounter });
                }
            },
            decrement () {
                if (this.counter > 0) {
                    this.counter -= 8;
                    this.pagecounter -= 1;
                    this.horses = this.renderhorses();
                    this.$store.commit("COUNTER_HORSES", { counter: this.counter, pagecounter: this.pagecounter });
                }
            }
        }
    };
</script>
