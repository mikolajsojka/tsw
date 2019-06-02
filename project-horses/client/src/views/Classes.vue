<template>
    <div class="classes">
        <div id="change-collection">
            <div @click="decrement">Poprzednia</div>
            <div id="pages" v-if="limit > 0">{{pagecounter}}/{{limit/8}}</div>
            <div id="pages" v-else>0/0</div>
            <div @click="increment">Następna</div>
        </div>
        <div id="collection">
            <ul>
                <div class="add" @click="addclass">Dodaj klasę</div>
                <li v-for="item in classes" :key="item._id" >
                    <div class="calculator" >{{ item.category }}</div>
                    <div class="edit" @click="renderclass(item)">E</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Classes",

        data () {
            return {
                counter: this.$store.state.counters.classes.counter,
                pagecounter: this.$store.state.counters.classes.pagecounter,
                limit: 0,
                classes: 0
            };
        },
        created () {
            this.$store.commit("FILL_COUNTER_CLASSES");
            this.limit = this.$store.state.counters.classes.limit;
            this.classes = this.$store.state.counters.classes.classes;
        },
        methods: {
            addclass () {
                router.push("/addclass");
            },
            renderclass (item) {
                router.push(`/class/${item._id}`);
            },
            renderclasses () {
                let allclasses = this.$store.state.classes;
                return Array.from(allclasses).slice(this.counter, this.counter + 8);
            },

            increment () {
                if (this.counter + 8 < this.limit) {
                    this.counter += 8;
                    this.pagecounter += 1;
                    this.classes = this.renderclasses();
                    this.$store.commit("COUNTER_CLASSES", {
                        counter: this.counter,
                        pagecounter: this.pagecounter
                    });
                }
            },
            decrement () {
                if (this.counter > 0) {
                    this.counter -= 8;
                    this.pagecounter -= 1;
                    this.classes = this.renderclasses();
                    this.$store.commit("COUNTER_CLASSES", {
                        counter: this.counter,
                        pagecounter: this.pagecounter
                    });
                }
            }
        }
    };
</script>
