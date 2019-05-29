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
                deletecheck: 0
            };
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
                let horse;
                let classes;
                let actualclass;
                Array.from(this.$store.state.horses).forEach(element => {
                    if (element._id === this.$route.params.id) {
                        horse = element;

                        classes = "<select>";
                        Array.from(this.$store.state.classes).forEach(item => {
                            if (element.class === item.number) {
                                actualclass = item.category;
                                console.log(item.category);
                                console.log(actualclass);
                                classes += `<option selected="selected" value="element.class">${
                                    item.category
                                }</option>`;
                            } else {
                                classes += `<option value="item.number">${
                                    item.category
                                }</option>`;
                            }
                        });
                        classes += "</select>";
                    }
                });
                if (horse) {
                    return `
                    <div id="info">
                        <div id="first">
                        <label>Imię</label>
                        <input name="name" value="${horse.name}"></input>
                        <label>Numer startowy</label>
                        <input name="number" value="${horse.number}"></input>
                        <label>Kraj Pochodzenia</label>
                        <input name="country" value="${horse.country}"></input>
                        <label>Data urodzenia</label>
                        <input name="yob" value="${horse.yob}"></input>
                        <label>Sierść</label>
                        <input name="hair" value="${horse.hair}"></input>
                        <label>Płeć</label>
                        <input name="sex" value="${horse.sex}"></input>
                        <label>Klasa startowa</label>
                        ${classes}
                        </div>  

                        <div id="second">
                        <label>Rodowód - Ojciec</label>
                        <input name="bloodline-father" value="${
                        horse.bloodline.father.name
                    }"></input>
                        <input name="bloodline-father" value="${
                        horse.bloodline.father.country
                    }"></input>
                        <label>Rodowód - Matka</label>
                        <input name="bloodline-mother" value="${
                        horse.bloodline.mother.name
                    }"></input>
                        <input name="bloodline-mother" value="${
                        horse.bloodline.mother.country
                    }"></input>
                        <label>Rodowód - Ojciec Matki</label>
                        <input name="bloodline-father-mother" value="${
                        horse.bloodline.fathermother.name
                    }"></input>
                        <input name="bloodline-father-mother" value="${
                        horse.bloodline.fathermother.country
                    }"></input>
                        <label>Hodowca</label>
                        <input name="breeder-name" value="${
                        horse.breeder.name
                    }"></input>
                        <input name="breeder-country" value="${
                        horse.breeder.country
                    }"></input>
                        <label>Właściciel</label>
                        <input name="owner-name" value="${
                        horse.owner.name
                    }"></input>
                        <input name="owner-country" value="${
                        horse.owner.country
                    }"></input>
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
