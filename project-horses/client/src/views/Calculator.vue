<template>
    <div id="calculator">
        <div class="category">
            <div class="name">{{actualclass.position+1}}/{{classesamount}}. {{actualclass.category}}</div>
        </div>

        <select name="choosehorse" class="choosehorse size" @change="change">
            <option v-for="horse in horses" :value="horse._id" :key="horse._id">{{horse.name}}</option>
        </select>

        <div class="notes">
            <div class="row" v-for="note in actualhorse.result.notes" :key="note._id">
                <input v-model="note.barrel">
                <input v-model="note.head">
                <input v-model="note.htype">
                <input v-model="note.legs">
                <input v-model="note.move">
            </div>
        </div>
    </div>
</template>

<script>
// import router from "../router";
    export default {
        name: "Calculator",
        data () {
            return {
                actualclass: {},
                actualhorse: {},
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

                    let check = 0;
                    Array.from(this.$store.state.horses).forEach(element2 => {
                        if (parseInt(element2.class) === parseInt(element.number)) {
                            if (check === 0) {
                                this.actualhorse = element2;
                                check = 1;
                            }
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
            change ({ target }) {
                if (target.name === "choosehorse") {
                    let index = this.horses.findIndex(item => item._id === target.value);
                    this.actualhorse = this.horses[index];
                }
            }
        }
    };
</script>
