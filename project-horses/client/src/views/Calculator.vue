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
                <input :tabindex="index+1" v-bind:id="note._id" @change="change" name="htype" v-bind:value="note.htype">

                <input :tabindex="(index+1+notes)" v-bind:id="note._id" @change="change" name="head" v-bind:value="note.head">

                <input :tabindex="(index+1+notes*2)" v-bind:id="note._id" @change="change" name="barrel" v-bind:value="note.barrel">

                <input :tabindex="(index+1+notes*3)" v-bind:id="note._id" @change="change" name="legs" v-bind:value="note.legs">

                <input :tabindex="(index+1+notes*4)" v-bind:id="note._id" @change="change" name="move" v-bind:value="note.move">
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
                actualhorse: {
                    test: 1,
                    result: {
                        notes: []
                    }
                },
                classesamount: 0,
                horses: [],
                judges: [],
                result: 0,
                checkarbitrator: false,
                renderComponent: true,
                notes: 0
            };
        },
        components: {
            Podium
        },
        created () {
            if (this.$store.state.user) {
                if (this.$store.state.actualhorses.length !== 0) {
                    this.fill();
                    this.results();
                    this.checkArbitrator();
                }
            } else { router.push("/auth"); }
        },
        async mounted () {
            if (!this.horses.length) {
                await router.push("/classes");
                alert("Nie przydzielono żadnego konia!");
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
                this.notes = this.actualhorse.result.notes.length;

                this.actualclass.committee.forEach(element => {
                    let index = this.$store.state.judges.findIndex(
                        item => item.id === element
                    );

                    this.judges.push(this.$store.state.judges[index]);
                });
            },
            checknote (x) {
                let note = x;

                while (note >= 0) {
                    if (note === 0.5) {
                        return true;
                    }

                    if (note < 0.5) {
                        return false;
                    }
                    note -= 0.5;
                }
            },
            change ({ target }) {
                let errors = [];
                if (target.name === "choosehorse") {
                    let index = this.horses.findIndex(item => item._id === target.value);
                    this.actualhorse = this.horses[index];
                    this.notes = this.actualhorse.result.notes.length;
                }

                if (target.name === "arbitrator") {
                    this.actualhorse.result.arbitrator = target.value;
                }

                if (target.name === "barrel") {
                    if (parseInt(target.value) >= 0 && parseInt(target.value) <= 20) {
                        if (this.checknote(parseFloat(target.value))) {
                            let index = this.actualhorse.result.notes.findIndex(
                                item => item._id === target.id
                            );
                            this.actualhorse.result.notes[index].barrel = target.value;
                        } else {
                            errors.push("Nota, kłoda - stopniowanie co 0.5");
                        }
                    } else {
                        errors.push("Nota, kłoda - przedział not to [0,20]");
                    }
                }

                if (target.name === "head") {
                    if (parseInt(target.value) >= 0 && parseInt(target.value) <= 20) {
                        if (this.checknote(parseFloat(target.value))) {
                            let index = this.actualhorse.result.notes.findIndex(
                                item => item._id === target.id
                            );
                            this.actualhorse.result.notes[index].head = target.value;
                        } else {
                            errors.push("Nota, głowa - stopniowanie co 0.5");
                        }
                    } else {
                        errors.push("Nota, głowa - przedział not to [0,20]");
                    }
                }

                if (target.name === "htype") {
                    if (parseInt(target.value) >= 0 && parseInt(target.value) <= 20) {
                        if (this.checknote(parseFloat(target.value))) {
                            let index = this.actualhorse.result.notes.findIndex(
                                item => item._id === target.id
                            );
                            this.actualhorse.result.notes[index].htype = target.value;
                        } else {
                            errors.push("Nota, sierść - stopniowanie co 0.5");
                        }
                    } else {
                        errors.push("Nota, sierść - przedział not to [0,20]");
                    }
                }

                if (target.name === "legs") {
                    if (parseInt(target.value) >= 0 && parseInt(target.value) <= 20) {
                        if (this.checknote(parseFloat(target.value))) {
                            let index = this.actualhorse.result.notes.findIndex(
                                item => item._id === target.id
                            );
                            this.actualhorse.result.notes[index].legs = target.value;
                        } else {
                            errors.push("Nota, nogi - stopniowanie co 0.5");
                        }
                    } else {
                        errors.push("Nota, nogi - przedział not to [0,20]");
                    }
                }

                if (target.name === "move") {
                    if (parseInt(target.value) >= 0 && parseInt(target.value) <= 20) {
                        if (this.checknote(parseFloat(target.value))) {
                            let index = this.actualhorse.result.notes.findIndex(
                                item => item._id === target.id
                            );
                            this.actualhorse.result.notes[index].move = target.value;
                        } else {
                            errors.push("Nota, ruch - stopniowanie co 0.5");
                        }
                    } else {
                        errors.push("Nota, ruch - przedział not to [0,20]");
                    }
                }

                this.results();

                this.checkarbitrator = false;
                this.checkArbitrator();

                this.renderComponent = false;

                this.$nextTick(() => {
                    this.renderComponent = true;
                });

                if (this.checkarbitrator === false) {
                    this.actualhorse.result.arbitrator = 0;
                }

                if (errors.length) {
                    errors.forEach(element => {
                        alert(element);
                    });
                } else {
                    this.$store.dispatch("EDIT_HORSE_NOTES", this.actualhorse);
                }
            }
        }
    };
</script>
