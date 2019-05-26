<template>
    <div class="classes">
        <div id="change-collection">
            <button @click="decrement">-1</button>
            {{pagecounter}}
            <button @click="increment">+1</button>
        </div>
        <div id="collection">
            <ul>
                <li v-for="item in classes" :key="item._id">{{ item.category }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
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
