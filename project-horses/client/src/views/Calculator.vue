<template>
    <div id="calculator">
        <div class="category">
            <div class="pagination" @click="decrement">-</div>
            <div class="name"> {{actualclass.position+1}}/{{classesamount}}. {{actualclass.category}}</div>
            <div class="pagination" @click="increment">+</div>
        </div>

        <select name="choosehorse" class="choosehorse size">
            <option v-for="horse in horses" :value="horse.id" :key="horse._id">{{horse.name}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "Calculator",
        data () {
            return {
                actualclass: {},
                classesamount: 0,
                horses: [],
                judges: []
            };
        },
        created () {
            Array.from(this.$store.state.classes).forEach((element, index) => {
                this.classesamount += 1;
                if (element._id === this.$route.params.id) {
                    this.actualclass = element;
                    this.actualclass.position = index;
                    Array.from(this.$store.state.horses).forEach(element2 => {
                        if (parseInt(element2.class) === parseInt(element.number)) {
                            this.horses.push(element2);
                        }
                    });

                    element.committee.forEach(element2 => {
                        Array.from(this.$store.state.judges).forEach(element3 => {
                            if (parseInt(element2) === parseInt(element3.id)) {
                                this.judges.push(element3);
                            }
                        });
                    });
                }
            });
        },
        methods: {
            increment () {},
            decrement () {}
        }
    };
</script>
