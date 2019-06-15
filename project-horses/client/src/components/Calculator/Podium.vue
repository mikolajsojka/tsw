<template>
    <div>
        <div class="podium">
            <div v-for="(horse,index) in podium()" :id="horse._id" :key="horse._id" >Miejsce {{++index}}. {{horse.name}}</div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Podium",

        methods: {

            podium () {
                let sorted = Array.prototype.slice.call(this.$store.state.actualhorses).sort(function (a, b) {
                    let aresult = 0;
                    let bresult = 0;

                    let ahtype = 0;
                    let amresult = 0;
                    let bhtype = 0;
                    let bmresult = 0;

                    a.result.notes.forEach(note => {
                        if (note.htype !== null) {
                            aresult += parseInt(note.htype);
                            ahtype += parseInt(note.htype);
                        }
                        if (note.move !== null) {
                            aresult += parseInt(note.move);
                            amresult += parseInt(note.move);
                        }
                    });

                    b.result.notes.forEach(note => {
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
                                return null;
                            } else {
                                return bmresult - amresult;
                            }
                        } else {
                            return bhtype - ahtype;
                        }
                    } else {
                        return bresult - aresult;
                    }
                });

                return sorted;
            }
        }
    };
</script>
