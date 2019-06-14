<template>
    <div class="podium">
        <div v-for="(horse,index) in podium" :key="horse._id">Miejsce {{++index}}. {{horse.name}}</div>

    </div>

</template>

<script>
    export default {
        name: "Podium",

        computed: {
            podium: function () {
                return Array.prototype.slice.call(this.$store.state.actualhorses).sort(function (a, b) {
                    let aresult = 0;
                    let bresult = 0;

                    a.result.notes.forEach(note => {
                        if (note.htype !== null) {
                            aresult += parseInt(note.htype);
                        }
                        if (note.move !== null) {
                            aresult += parseInt(note.move);
                        }
                    });

                    b.result.notes.forEach(note => {
                        if (note.htype !== null) {
                            bresult += parseInt(note.htype);
                        }
                        if (note.move !== null) {
                            bresult += parseInt(note.move);
                        }
                    });

                    return bresult - aresult;
                });
            }
        }
    };
</script>
