<template>
    <div id="calculator">
        <div class="category">
            <div class="name">{{actualclass.position+1}}/{{classesamount}}. {{actualclass.category}}</div>
        </div>

        <select name="choosehorse" class="choosehorse size" @change="change">
            <option v-for="horse in horses" :value="horse._id" :key="horse._id">{{horse.name}}</option>
        </select>

        <div class="notes">
            <div class="row" v-for="(note,index) in actualhorse.result.notes" :key="note._id">
                <input v-bind:id="note._id" @change="change" name="barrel" v-model="note.barrel">
                <input v-bind:id="note._id" @change="change" name="head" v-model="note.head">
                <input v-bind:id="note._id" @change="change" name="htype" v-model="note.htype">
                <input v-bind:id="note._id" @change="change" name="legs" v-model="note.legs">
                <input v-bind:id="note._id" @change="change" name="move" v-model="note.move">
                <div class="judge">{{judges[index].judge}}</div>
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
            if (this.$store.state.actualhorses.length !== 0) {
                this.fill();
            }
        },
        methods: {
            fill () {
                Array.from(this.$store.state.classes).forEach((element, index) => {
                    this.classesamount += 1;
                    if (element._id === this.$route.params.id) {
                        this.actualclass = element;
                        this.actualclass.position = index;

                        let check = 0;
                        Array.from(this.$store.state.actualhorses).forEach(element2 => {
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
            change ({ target }) {
                if (target.name === "choosehorse") {
                    let index = this.horses.findIndex(item => item._id === target.value);
                    this.actualhorse = this.horses[index];
                }

                if (target.name === "barrel") {
                    let index = this.actualhorse.result.notes.findIndex(
                        item => item._id === target.id
                    );
                    this.actualhorse.result.notes[index].barrel = target.value;
                }

                if (target.name === "head") {
                    let index = this.actualhorse.result.notes.findIndex(
                        item => item._id === target.id
                    );
                    this.actualhorse.result.notes[index].head = target.value;
                }

                if (target.name === "htype") {
                    let index = this.actualhorse.result.notes.findIndex(
                        item => item._id === target.id
                    );
                    this.actualhorse.result.notes[index].htype = target.value;
                }

                if (target.name === "legs") {
                    let index = this.actualhorse.result.notes.findIndex(
                        item => item._id === target.id
                    );
                    this.actualhorse.result.notes[index].legs = target.value;
                }

                if (target.name === "move") {
                    let index = this.actualhorse.result.notes.findIndex(
                        item => item._id === target.id
                    );
                    this.actualhorse.result.notes[index].move = target.value;
                }
                console.log(this.actualhorse);
                this.$store.dispatch("EDIT_HORSE_NOTES", this.actualhorse);
            }
        }
    };
</script>
