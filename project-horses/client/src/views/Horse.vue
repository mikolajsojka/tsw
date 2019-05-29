<template>
    <div id="horse">
        <div class="panel">
            <div class="button delete" @click="deletehorse">Usuń konia</div>

            <div class="main">
                <div id="info">
                    <div id="first">
                        <label>Imię</label>
                        <input name="name" v-model="horse.name">
                        <label>Numer startowy</label>
                        <input name="number" v-model="horse.number">
                        <label>Kraj Pochodzenia</label>
                        <input name="country" v-model="horse.country">
                        <label>Data urodzenia</label>
                        <input name="yob" v-model="horse.yob">
                        <label>Sierść</label>
                        <input name="hair" v-model="horse.hair">
                        <label>Płeć</label>
                        <input name="sex" v-model="horse.sex">
                        <label>Klasa startowa</label>
                        <select>
                            <option v-for="item in classes" :key="item._id">{{item.name}}</option>
                        </select>
                    </div>

                    <div id="second">
                        <label>Rodowód - Ojciec</label>
                        <input
                            name="bloodline-father"
                            v-model="
                                horse.bloodline.father.name
                            "
                        >
                        <input
                            name="bloodline-father"
                            v-model="horse.bloodline.father.country
                            "
                        >
                        <label>Rodowód - Matka</label>
                        <input
                            name="bloodline-mother"
                            v-model="horse.bloodline.mother.name
                            "
                        >
                        <input
                            name="bloodline-mother"
                            v-model="horse.bloodline.mother.country
                            "
                        >
                        <label>Rodowód - Ojciec Matki</label>
                        <input
                            name="bloodline-father-mother"
                            v-model="horse.bloodline.fathermother.name
                            "
                        >
                        <input
                            name="bloodline-father-mother"
                            v-model="horse.bloodline.fathermother.country
                            "
                        >
                        <label>Hodowca</label>
                        <input
                            name="breeder-name"
                            v-model="
                                horse.breeder.name
                            "
                        >
                        <input name="breeder-country" v-model="horse.breeder.country
                        ">
                        <label>Właściciel</label>
                        <input name="owner-name" v-model="horse.owner.name
                        ">
                        <input
                            name="owner-country"
                            v-model="
                                horse.owner.country
                            "
                        >
                    </div>
                </div>
            </div>
            <div class="button">Zatwierdź</div>
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
                classes: [
                    {
                        id: "",
                        name: ""
                    }
                ],
                actualclass: ""
            };
        },
        created () {
            Array.from(this.$store.state.horses).forEach(element => {
                if (element._id === this.$route.params.id) {
                    this.check = 1;
                    this.horse = element;
                    Array.from(this.$store.state.classes).forEach(item => {
                        if (element.class === item.number) {
                            this.actualclass = item.category;
                            this.classes.push({ id: element.class, name: item.category });
                        } else {
                            this.classes.push({ id: item.number, name: item.category });
                        }
                    });
                }
            });

            if (this.check === 0) {
                router.push("/main");
                alert("Nie znaleziono takiego konia");
            }
        },
        methods: {
            deletehorse () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.$store.dispatch("DELETE_HORSE", this.$route.params.id);
                }
            }
        }
    };
</script>
