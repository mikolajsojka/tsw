<template>
    <div class="horse">
        <div class="panel">
            <div class="button delete" @click="deletehorse">Usuń konia</div>

            <div class="main">
                <div class="info">
                    <div class="first">
                        <label>Imię</label>
                        <input name="name" v-model="horse.name" @change="change">
                        <label>Numer startowy</label>
                        <input name="number" v-model="horse.number" @change="change">
                        <label>Kraj Pochodzenia</label>
                        <input name="country" v-model="horse.country" @change="change">
                        <label>Data urodzenia</label>
                        <input name="yob" v-model="horse.yob" @change="change">
                        <label>Sierść</label>
                        <input name="hair" v-model="horse.hair" @change="change">
                        <label>Płeć</label>
                        <input name="sex" v-model="horse.sex" @change="change">
                        <label>Klasa startowa</label>
                        <select name="classes" @change="change">
                            <option v-for="item in classes" :value="item.number" :key="item._id">{{item.category}}</option>
                            <option :value="actualclass.number" selected>{{actualclass.category}}</option>
                        </select>
                    </div>

                    <div class="second">
                        <label>Rodowód - Ojciec</label>
                        <input
                            name="bloodline-father"
                            v-model="
                                horse.bloodline.father.name
                            "
                            @change="change"
                        >
                        <input
                            name="bloodline-father-country"
                            v-model="horse.bloodline.father.country
                            "
                            @change="change"
                        >
                        <label>Rodowód - Matka</label>
                        <input
                            name="bloodline-mother"
                            v-model="horse.bloodline.mother.name
                            "
                            @change="change"
                        >
                        <input
                            name="bloodline-mother-country"
                            v-model="horse.bloodline.mother.country
                            "
                            @change="change"
                        >
                        <label>Rodowód - Ojciec Matki</label>
                        <input
                            name="bloodline-father-mother"
                            v-model="horse.bloodline.fathermother.name
                            "
                            @change="change"
                        >
                        <input
                            name="bloodline-father-mother-country"
                            v-model="horse.bloodline.fathermother.country
                            "
                            @change="change"
                        >
                        <label>Hodowca</label>
                        <input
                            name="breeder-name"
                            v-model="
                                horse.breeder.name
                            "
                            @change="change"
                        >
                        <input
                            name="breeder-country"
                            v-model="horse.breeder.country
                            "
                            @change="change"
                        >
                        <label>Właściciel</label>
                        <input
                            name="owner-name"
                            v-model="horse.owner.name
                            "
                            @change="change"
                        >
                        <input
                            name="owner-country"
                            v-model="
                                horse.owner.country
                            "
                            @change="change"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

    <script>
    import router from "../router";
    export default {
        name: "Horse",
        data () {
            return {
                check: 0,
                horse: {},
                classes: [],
                actualclass: {
                    number: "",
                    category: ""
                }
            };
        },
        created () {
            let index = this.$store.state.horses.findIndex(
                item => item._id === this.$route.params.id
            );
            this.horse = this.$store.state.horses[index];

            let index2 = this.$store.state.classes.findIndex(
                item => item.number === this.horse.class
            );

            try {
                this.actualclass = this.$store.state.classes[index2];

                this.$store.state.classes.forEach(element => {
                    if (element._id !== this.actualclass._id) {
                        this.classes.push(element);
                    }
                });
            } catch (err) {
                this.$store.state.classes.forEach(element => {
                    this.classes.push(element);
                });
                this.actualclass = { number: -1, category: "brak klasy" };
            }
        },
        methods: {
            change ({ target }) {
                if (target.name === "name") {
                    this.horse.name = target.value;
                }

                if (target.name === "number") {
                    this.horse.number = target.value;
                }

                if (target.name === "country") {
                    this.horse.country = target.value;
                }

                if (target.name === "yob") {
                    this.horse.yob = target.value;
                }

                if (target.name === "hair") {
                    this.horse.hair = target.value;
                }

                if (target.name === "sex") {
                    this.horse.sex = target.value;
                }

                if (target.name === "bloodline-father") {
                    this.horse.bloodline.father.name = target.value;
                }

                if (target.name === "bloodline-father-country") {
                    this.horse.bloodline.father.country = target.value;
                }

                if (target.name === "bloodline-mother") {
                    this.horse.bloodline.mother.name = target.value;
                }

                if (target.name === "bloodline-mother-country") {
                    this.horse.bloodline.mother.country = target.value;
                }

                if (target.name === "bloodline-father-mother") {
                    this.horse.bloodline.fathermother.name = target.value;
                }

                if (target.name === "bloodline-father-mother-country") {
                    this.horse.bloodline.fathermother.country = target.value;
                }

                if (target.name === "classes") {
                    this.horse.class = target.value;
                }

                this.$store.dispatch("EDIT_HORSE", this.horse);
            },
            deletehorse () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.$store.dispatch("DELETE_HORSE", this.$route.params.id);

                    this.$store.commit("FILL_COUNTER_HORSES");
                    router.push("/horses");
                }
            }
        }
    };
</script>
