<template>
    <div>
        <div class="podium" >
            <div v-for="(horse,index) in sorted.reverse()" :id="horse._id" :key="horse._id" >Miejsce {{++index}}. {{horse.name}} - {{points(horse)}} pkt</div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Podium",

        data () {
            return {
                arbitrator: [],
                sorted: []
            };
        },
        created () {
            this.sorted = Array.prototype.slice.call(this.$store.state.actualhorses).sort((a, b) => {
                let aresult = 0;
                let bresult = 0;

                let ahtype = 0;
                let amresult = 0;
                let bhtype = 0;
                let bmresult = 0;
                let asum = 0;
                let bsum = 0;

                a.result.notes.forEach(note => {
                    if (note.htype !== null) {
                        aresult += parseFloat(note.htype);
                        ahtype += parseFloat(note.htype);
                        asum += parseFloat(note.htype);
                    }
                    if (note.move !== null) {
                        aresult += parseFloat(note.move);
                        amresult += parseFloat(note.move);
                        asum += parseFloat(note.move);
                    }
                    if (note.barrel !== null) {
                        asum += parseFloat(note.barrel);
                    }

                    if (note.legs !== null) {
                        asum += parseFloat(note.legs);
                    }

                    if (note.head !== null) {
                        asum += parseFloat(note.head);
                    }
                });

                b.result.notes.forEach(note => {
                    if (note.htype !== null) {
                        bresult += parseFloat(note.htype);
                        bhtype += parseFloat(note.htype);
                        bsum += parseFloat(note.htype);
                    }
                    if (note.move !== null) {
                        bresult += parseFloat(note.move);
                        bmresult += parseFloat(note.move);
                        bsum += parseFloat(note.move);
                    }
                    if (note.barrel !== null) {
                        bsum += parseFloat(note.barrel);
                    }

                    if (note.legs !== null) {
                        bsum += parseFloat(note.legs);
                    }

                    if (note.head !== null) {
                        bsum += parseFloat(note.head);
                    }
                });

                if (asum > bsum) {
                    return bsum - asum;
                }

                if (asum === bsum) {
                    if (aresult === bresult) {
                        if (ahtype === bhtype) {
                            if (amresult === bmresult) {
                                if (bresult !== 0) {
                                    this.arbitrator.push(b._id);
                                }
                                if (aresult !== 0) {
                                    this.arbitrator.push(a._id);
                                }
                                return a.result.arbitrator - b.result.arbitrator;
                            } else {
                                return bmresult - amresult;
                            }
                        } else {
                            return bhtype - ahtype;
                        }
                    } else {
                        return bresult - aresult;
                    }
                }
            });
        },
        mounted () {
            this.arbitrator.forEach(element => {
                document.getElementById(element).style.backgroundColor = "red";
            });
        },
        methods: {
            points (horse) {
                let index = this.$store.state.actualhorses.findIndex(element => element._id === horse._id);
                let result = 0;
                this.$store.state.actualhorses[index].result.notes.forEach(note => {
                    if (note.htype !== null) {
                        result += parseInt(note.htype);
                    }
                    if (note.head !== null) {
                        result += parseInt(note.head);
                    }

                    if (note.barrel !== null) {
                        result += parseInt(note.barrel);
                    }

                    if (note.legs !== null) {
                        result += parseInt(note.legs);
                    }

                    if (note.move !== null) {
                        result += parseInt(note.move);
                    }
                });

                return result;
            }
        }
    };
</script>
