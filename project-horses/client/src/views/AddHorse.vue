<template>
    <div class="horse">
        <div class="panel">
            <div class="button save" @click="savehorse">Zatwierdź</div>

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
                            <option v-for="item in classes" :value="item.number" :key="item._id">Nr {{item.number}}. {{item.category}}</option>
                            <option :value="actualclass.id" selected></option>
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
    // import router from "../router";
    export default {
        name: "AddHorse",
        data () {
            return {
                check: 0,
                horse: {
                    number: "",
                    class: "",
                    name: "",
                    country: "",
                    yob: "",
                    hair: "",
                    sex: "",
                    breeder: {
                        name: "",
                        country: ""
                    },
                    owner: {
                        name: "",
                        country: ""
                    },
                    bloodline: {
                        father: {
                            name: "",
                            country: ""
                        },
                        mother: {
                            name: "",
                            country: ""
                        },
                        fathermother: {
                            name: "",
                            country: ""
                        }
                    }
                },
                classes: [],
                actualclass: {
                    id: "",
                    name: ""
                }
            };
        },
        created () {
            this.classes = this.$store.state.classes;
        },
        methods: {
            savehorse () {
                let errors = [];

                if (this.horse.name === "") {
                    errors.push("Nie podano nazwy konia!");
                }

                if (this.horse.number === "") {
                    errors.push("Nie podano numeru startowego konia!");
                }

                if (this.horse.country === "") {
                    errors.push("Nie podano kraju pochodzenia konia!");
                }

                if (this.horse.yob === "") {
                    errors.push("Nie podano daty urodzenia konia!");
                }

                if (this.horse.hair === "") {
                    errors.push("Nie podano sierści konia!");
                }

                if (this.horse.sex === "") {
                    errors.push("Nie podano płci konia!");
                }

                if (this.horse.bloodline.father.name === "") {
                    errors.push("Nie podano nazwy ojca konia!");
                }

                if (this.horse.bloodline.father.country === "") {
                    errors.push("Nie podano kraju pochodzenia ojca konia!");
                }

                if (this.horse.bloodline.mother.name === "") {
                    errors.push("Nie podano nazwy matki konia!");
                }

                if (this.horse.bloodline.mother.country === "") {
                    errors.push("Nie podano kraju pochodzenia matki konia!");
                }

                if (this.horse.bloodline.fathermother.name === "") {
                    errors.push("Nie podano nazwy ojca matki konia!");
                }

                if (this.horse.bloodline.fathermother.country === "") {
                    errors.push("Nie podano kraju pochodzenia ojca matki konia!");
                }

                if (this.horse.class === "") {
                    errors.push("Nie dodano konia do żadnej klasy!");
                }

                if (isNaN(parseInt(this.horse.number))) {
                    errors.push("Numer startowy konia musi być liczbą całkowitą!");
                }

                if (errors.length) {
                    errors.forEach(element => {
                        alert(element);
                    });
                } else {
                    this.$store.dispatch("ADD_HORSE", this.horse);
                }
            },
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
            }
        }
    };
</script>
