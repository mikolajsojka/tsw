<template>
    <div class="horses">
        <div id="change-collection">
            <div @click="decrement">Poprzednia</div>
            <div id="pages">{{pagecounter}}/{{limit/8}}</div>
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
            let allhorses = this.$store.state.horses;
            return {
                counter: 0,
                pagecounter: 1,
                limit: Math.ceil(allhorses.length / 8) * 8,
                horses: Array.from(allhorses).slice(0, 8)
            };
        },
        methods: {
            addhorse () {
                router.push("/addhorse");
            },
            renderhorse (horse) {
                this.$store.commit("CLICKED", { type: "horse", data: horse });
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
                }
            },
            decrement () {
                if (this.counter > 0) {
                    this.counter -= 8;
                    this.pagecounter -= 1;
                    this.horses = this.renderhorses();
                }
            }
        }
    };
</script>
