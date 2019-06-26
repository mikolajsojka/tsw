<template>
    <div class="horse">
        <div class="panel">
            <div class="button delete" @click="deletehorse">Usuń konia</div>

            <div class="main">
                <div class="info">
                    <div class="first">
                        <label>Imię</label>
                        <input name="name" v-bind:value="horse.name" @change="change">
                        <label>Numer startowy</label>
                        <input name="number" v-bind:value="horse.number" @change="change">
                        <label>Kraj Pochodzenia</label>
                        <input name="country" v-bind:value="horse.country" @change="change">
                        <label>Data urodzenia</label>
                        <input name="yob" v-bind:value="horse.yob" @change="change">
                        <label>Sierść</label>
                        <input name="hair" v-bind:value="horse.hair" @change="change">
                        <label>Płeć</label>
                        <input name="sex" v-bind:value="horse.sex" @change="change">
                        <label>Klasa startowa</label>
                        <select name="classes" @change="change">
                            <option v-for="item in classes" :value="item.number" :key="item._id">Nr {{item.number}}. {{item.category}}</option>
                            <option :value="actualclass.number" selected>Nr {{actualclass.number}}. {{actualclass.category}}</option>
                        </select>
                    </div>

                    <div class="second">
                        <label>Rodowód - Ojciec</label>
                        <input
                            name="bloodline-father"
                            v-bind:value="
                                horse.bloodline.father.name
                            "
                            @change="change"
                        >
                        <input
                            name="bloodline-father-country"
                            v-bind:value="horse.bloodline.father.country
                            "
                            @change="change"
                        >
                        <label>Rodowód - Matka</label>
                        <input
                            name="bloodline-mother"
                            v-bind:value="horse.bloodline.mother.name
                            "
                            @change="change"
                        >
                        <input
                            name="bloodline-mother-country"
                            v-bind:value="horse.bloodline.mother.country
                            "
                            @change="change"
                        >
                        <label>Rodowód - Ojciec Matki</label>
                        <input
                            name="bloodline-father-mother"
                            v-bind:value="horse.bloodline.fathermother.name
                            "
                            @change="change"
                        >
                        <input
                            name="bloodline-father-mother-country"
                            v-bind:value="horse.bloodline.fathermother.country
                            "
                            @change="change"
                        >
                        <label>Hodowca</label>
                        <input
                            name="breeder-name"
                            v-bind:value="
                                horse.breeder.name
                            "
                            @change="change"
                        >
                        <input
                            name="breeder-country"
                            v-bind:value="horse.breeder.country
                            "
                            @change="change"
                        >
                        <label>Właściciel</label>
                        <input
                            name="owner-name"
                            v-bind:value="horse.owner.name
                            "
                            @change="change"
                        >
                        <input
                            name="owner-country"
                            v-bind:value="
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

                }
            };
        },
        created () {
            if (this.$store.state.user) {
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
                    this.actualclass = { number: -1, category: "usunięta klasa" };
                }
            } else { router.push("/auth"); }
        },
        methods: {
            change ({ target }) {
                let errors = [];

                if (target.name === "name") {
                    if (target.value !== "") {
                        this.horse.name = target.value;
                    } else {
                        errors.push("Imię konia nie może być puste!");
                    }
                }

                if (target.name === "number") {
                    if (target.value !== "") {
                        this.horse.number = target.value;
                    }
                    if (target.value === "") {
                        errors.push("Numer konia nie może być pusty!");
                    }

                    if (isNaN(parseInt(target.value))) {
                        errors.push("Numer startowy konia musi być liczbą całkowitą!");
                    }
                }

                if (target.name === "country") {
                    if (target.value !== "") {
                        this.horse.country = target.value;
                    } else {
                        errors.push("Kraj pochodzenia konia nie może być pusty!");
                    }
                }

                if (target.name === "yob") {
                    if (target.value !== "") {
                        this.horse.yob = target.value;
                    }

                    if (isNaN(Date.parse(new Date(target.value)))) {
                        errors.push("Zły format daty!");
                    }

                    if (target.value === "") {
                        errors.push("Data urodzenia konia nie może być pusta!");
                    }
                }

                if (target.name === "hair") {
                    if (target.value !== "") {
                        this.horse.hair = target.value;
                    } else {
                        errors.push("Sierść konia nie może być pusta!");
                    }
                }

                if (target.name === "sex") {
                    if (target.value !== "") {
                        this.horse.sex = target.value;
                    } else {
                        errors.push("Płeć konia nie może być pusta!");
                    }
                }

                if (target.name === "bloodline-father") {
                    if (target.value !== "") {
                        this.horse.bloodline.father.name = target.value;
                    } else {
                        errors.push("Ojciec konia nie może być pusty!");
                    }
                }

                if (target.name === "bloodline-father-country") {
                    if (target.value !== "") {
                        this.horse.bloodline.father.country = target.value;
                    } else {
                        errors.push("Kraj ojca konia nie może być pusty!");
                    }
                }

                if (target.name === "bloodline-mother") {
                    if (target.value !== "") {
                        this.horse.bloodline.mother.name = target.value;
                    } else {
                        errors.push("Matka konia nie może być pusta!");
                    }
                }

                if (target.name === "bloodline-mother-country") {
                    if (target.value !== "") {
                        this.horse.bloodline.mother.country = target.value;
                    } else {
                        errors.push("Kraj matki konia nie może być pusty!");
                    }
                }

                if (target.name === "bloodline-father-mother") {
                    if (target.value !== "") {
                        this.horse.bloodline.fathermother.name = target.value;
                    } else {
                        errors.push("Ojciec matki konia nie może być pusty!");
                    }
                }

                if (target.name === "bloodline-father-mother-country") {
                    if (target.value !== "") {
                        this.horse.bloodline.fathermother.country = target.value;
                    } else {
                        errors.push("Kraj ojca matki konia nie może być pusty!");
                    }
                }

                if (target.name === "classes") {
                    if (target.value !== "") {
                        this.horse.class = target.value;
                    } else {
                        errors.push("Koń musi być przydzielony do jakiejś klasy!");
                    }
                }

                if (target.name === "breeder-name") {
                    if (target.value !== "") {
                        this.horse.breeder.name = target.value;
                    } else {
                        errors.push("Godność hodowcy konia nie może być pusta!");
                    }
                }

                if (target.name === "breeder-country") {
                    if (target.value !== "") {
                        this.horse.breeder.country = target.value;
                    } else {
                        errors.push("Kraj pochodzenia hodowcy konia nie może być pusty!");
                    }
                }

                if (target.name === "owner-name") {
                    if (target.value !== "") {
                        this.horse.owner.name = target.value;
                    } else {
                        errors.push("Godność właściciela konia nie może być pusta!");
                    }
                }

                if (target.name === "owner-country") {
                    if (target.value !== "") {
                        this.horse.owner.country = target.value;
                    } else {
                        errors.push("Kraj pochodzenia właściciela konia nie może być pusty!");
                    }
                }

                if (errors.length) {
                    errors.forEach(element => {
                        alert(element);
                    });
                } else {
                    this.$store.dispatch("EDIT_HORSE", this.horse);
                }
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
