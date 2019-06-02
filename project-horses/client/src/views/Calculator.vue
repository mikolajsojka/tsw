<template>
    <div id="calculator">
        <div class="category">{{actualclass.category}}
        </div>

    </div>
</template>

<script>
    export default {
        name: "Calculator",
        data () {
            return {
                actualclass: {},
                horses: [],
                judges: []
            };
        },
        created () {
            Array.from(this.$store.state.classes).forEach(element => {
                if (element._id === this.$route.params.id) {
                    this.actualclass = element;
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

        }
    };
</script>
