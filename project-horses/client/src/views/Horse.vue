<template>
    <div id="horse">
        <div class="panel">
            <div class="button delete" @click="deletehorse">Usuń konia</div>
            <div class="main" v-html="renderhorse()"></div>
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
                deletecheck: 0,
                horse: {},
                classes: "",
                actualclass: ""
            };
        },
        created () {
            Array.from(this.$store.state.horses).forEach(element => {
                if (element._id === this.$route.params.id) {
                    this.horse = element;

                    this.classes = "<select>";
                    Array.from(this.$store.state.classes).forEach(item => {
                        if (element.class === item.number) {
                            this.actualclass = item.category;
                            this.classes += `<option selected="selected" value="element.class">${
                                item.category
                            }</option>`;
                        } else {
                            this.classes += `<option value="item.number">${
                                item.category
                            }</option>`;
                        }
                    });
                    this.classes += "</select>";
                }
            });

            console.log(this.horse);
        },
        methods: {
            deletehorse () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.$store.dispatch("DELETE_HORSE", this.$route.params.id);
                } else {
                }
                this.deletecheck = 1;
            },

            renderhorse () {
                if (this.horse) {
                    return `
                    <div id="info">
                        <div id="first">
                        <label>Imię</label>
                        <input name="name" value="${this.horse.name}" />
                        <label>Numer startowy</label>
                        <input name="number" value="${this.horse.number}"/>
                        <label>Kraj Pochodzenia</label>
                        <input name="country" value="${this.horse.country}"/>
                        <label>Data urodzenia</label>
                        <input name="yob" value="${this.horse.yob}"/>
                        <label>Sierść</label>
                        <input name="hair" value="${this.horse.hair}"/>
                        <label>Płeć</label>
                        <input name="sex" value="${this.horse.sex}"/>
                        <label>Klasa startowa</label>
                        ${this.classes}
                        </div>  

                        <div id="second">
                        <label>Rodowód - Ojciec</label>
                        <input name="bloodline-father" value="${
                        this.horse.bloodline.father.name
                    }"/>
                        <input name="bloodline-father" value="${
                        this.horse.bloodline.father.country
                    }"/>
                        <label>Rodowód - Matka</label>
                        <input name="bloodline-mother" value="${
                        this.horse.bloodline.mother.name
                    }"/>
                        <input name="bloodline-mother" value="${
                        this.horse.bloodline.mother.country
                    }"/>
                        <label>Rodowód - Ojciec Matki</label>
                        <input name="bloodline-father-mother" value="${
                        this.horse.bloodline.fathermother.name
                    }"/>
                        <input name="bloodline-father-mother" value="${
                        this.horse.bloodline.fathermother.country
                    }"/>
                        <label>Hodowca</label>
                        <input name="breeder-name" value="${
                        this.horse.breeder.name
                    }"/>
                        <input name="breeder-country" value="${
                        this.horse.breeder.country
                    }"/>
                        <label>Właściciel</label>
                        <input name="owner-name" value="${
                        this.horse.owner.name
                    }"/>
                        <input name="owner-country" value="${
                        this.horse.owner.country
                    }"/>
                        </div>
                    </div>
                    
                        
                    `;
                } else {
                    router.push("/main");
                    if (!this.deletecheck) {
                        alert("Nie znaleziono takiego konia");
                    }
                }
            }
        }
    };
</script>
