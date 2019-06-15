<template>
    <div id="calculator">
        <div class="category">
            <div class="name">{{actualclass.position+1}}/{{classesamount}}. {{actualclass.category}}</div>
        </div>
        <Podium v-if="renderComponent"/>
        <div class="noteinfo">
            <div>T</div>
            <div>G</div>
            <div>K</div>
            <div>N</div>
            <div>M</div>
            <select name="choosehorse" class="choosehorse size" @change="change">
                <option
                    v-for="horse in horses"
                    :value="horse._id"
                    :key="horse._id"
                >Nr {{horse.number}}. {{horse.name}}</option>
            </select>
        </div>

        <div class="notes">
            <div class="row" v-for="(note,index) in actualhorse.result.notes" :key="note._id">
                <input v-bind:id="note._id" @change="change" name="htype" v-model="note.htype">

                <input v-bind:id="note._id" @change="change" name="head" v-model="note.head">

                <input v-bind:id="note._id" @change="change" name="barrel" v-model="note.barrel">

                <input v-bind:id="note._id" @change="change" name="legs" v-model="note.legs">

                <input v-bind:id="note._id" @change="change" name="move" v-model="note.move">
                <div class="judge" @click="goJudge(judges[index]._id)">{{judges[index].judge}}</div>
            </div>
            <div class="arbitrator" v-if="checkarbitrator">
                <input name="arbitrator" @change="change" v-model="actualhorse.result.arbitrator">
                <div>Rozjemca</div></div>
            <div class="result">{{result}}</div>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    import Podium from "../components/Calculator/Podium";
    export default {
        name: "Calculator",
        data () {
            return {
                actualclass: {},
                actualhorse: {},
                classesamount: 0,
                horses: [],
                judges: [],
                result: 0,
                checkarbitrator: false,
                renderComponent: true
            };
        },
        components: {
            Podium
        },
        created () {
            if (this.$store.state.actualhorses.length !== 0) {
                this.fill();
                this.results();
                this.checkArbitrator();
            }
        },
        methods: {
            checkArbitrator () {
                let aresult = 0;
                let ahtype = 0;
                let amresult = 0;

                this.actualhorse.result.notes.forEach(note => {
                    if (note.htype !== null) {
                        aresult += parseInt(note.htype);
                        ahtype += parseInt(note.htype);
                    }
                    if (note.move !== null) {
                        aresult += parseInt(note.move);
                        amresult += parseInt(note.move);
                    }
                });

                this.horses.forEach(actualhorse => {
                    let bresult = 0;
                    let bhtype = 0;
                    let bmresult = 0;
                    if (actualhorse._id !== this.actualhorse._id) {
                        actualhorse.result.notes.forEach(note => {
                            if (note.htype !== null) {
                                bresult += parseInt(note.htype);
                                bhtype += parseInt(note.htype);
                            }
                            if (note.move !== null) {
                                bresult += parseInt(note.move);
                                bmresult += parseInt(note.move);
                            }
                        });
                        if (aresult === bresult) {
                            if (ahtype === bhtype) {
                                if (amresult === bmresult) {
                                    this.checkarbitrator = true;
                                }
                            }
                        }
                    }
                });
            },
            results () {
                this.result = 0;
                this.actualhorse.result.notes.forEach(note => {
                    if (note.htype !== null) {
                        this.result += parseInt(note.htype);
                    }
                    if (note.move !== null) {
                        this.result += parseInt(note.move);
                    }
                });
            },
            goJudge (id) {
                router.push(`/judge/${id}`);
            },
            fill () {
                this.classesamount = this.$store.state.classes.length;
                let index = this.$store.state.classes.findIndex(
                    item => item._id === this.$route.params.id
                );

                this.actualclass = this.$store.state.classes[index];
                this.actualclass.position = index;

                this.horses = this.$store.state.actualhorses;
                this.actualhorse = this.horses[0];

                this.actualclass.committee.forEach(element => {
                    let index = this.$store.state.judges.findIndex(
                        item => item.id === element
                    );

                    this.judges.push(this.$store.state.judges[index]);
                });
            },
            change ({ target }) {
                if (target.name === "choosehorse") {
                    let index = this.horses.findIndex(item => item._id === target.value);
                    this.actualhorse = this.horses[index];
                    this.checkarbitrator = false;
                    this.checkArbitrator();
                }

                if (target.name === "arbitrator") {
                    this.actualhorse.result.arbitrator = target.value;
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

                this.results();
                this.$store.dispatch("EDIT_HORSE_NOTES", this.actualhorse);

                this.renderComponent = false;

                this.$nextTick(() => {
                    this.renderComponent = true;
                });
            }
        }
    };
</script>
