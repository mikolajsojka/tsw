<template>
    <div class="classes">
        <div id="change-collection">
            <div @click="decrement">Poprzednia</div>
            <div id="pages">{{pagecounter}}/{{limit/8}}</div>
            <div @click="increment">Następna</div>
        </div>
        <div id="collection">
            <ul>
                <div class="add" @click="addclass">Dodaj klasę</div>
                <li v-for="item in classes" :key="item._id" @click="renderclass(item)">{{ item.category }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Classes",

        data () {
            let allclasses = this.$store.state.classes;
            return {
                counter: 0,
                pagecounter: 1,
                limit: Math.ceil(allclasses.length / 8) * 8,
                classes: Array.from(allclasses).slice(0, 8)
            };
        },
        methods: {
            addclass () {
                router.push("/addclass");
            },
            renderclass (item) {
                this.$store.commit("CLICKED", { type: "class", data: item });
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
                }
            },
            decrement () {
                if (this.counter > 0) {
                    this.counter -= 8;
                    this.pagecounter -= 1;
                    this.classes = this.renderclasses();
                }
            }
        }
    };
</script>
