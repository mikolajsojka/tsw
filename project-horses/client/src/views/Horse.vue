<template>
    <div id="horse">
        <div class="panel" v-html="renderhorse()"></div>

    </div>
</template>

    <script>
    export default {
        name: "Horse",
        methods: {
            renderhorse () {
                let horse;
                Array.from(this.$store.state.horses).forEach(element => {
                    if (element._id === this.$route.params.id) {
                        horse = element;
                    }
                });
                if (horse) {
                    return `
                    <div class="button delete">Usuń konia</div>
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
                        <input name="class" value="${horse.class}"></input>
                        </div>  

                        <div id="second">
                        <label>Rodowód - Ojciec</label>
                        <input name="bloodline-father" value="${horse.bloodline.father.name}"></input>
                        <input name="bloodline-father" value="${horse.bloodline.father.country}"></input>
                        <label>Rodowód - Matka</label>
                        <input name="bloodline-mother" value="${horse.bloodline.mother.name}"></input>
                        <input name="bloodline-mother" value="${horse.bloodline.mother.country}"></input>
                        <label>Rodowód - Ojciec Matki</label>
                        <input name="bloodline-father-mother" value="${horse.bloodline.fathermother.name}"></input>
                        <input name="bloodline-father-mother" value="${horse.bloodline.fathermother.country}"></input>
                        <label>Hodowca</label>
                        <input name="breeder-name" value="${horse.breeder.name}"></input>
                        <input name="breeder-country" value="${horse.breeder.country}"></input>
                        <label>Właściciel</label>
                        <input name="owner-name" value="${horse.owner.name}"></input>
                        <input name="owner-country" value="${horse.owner.country}"></input>
                        </div>
                    </div>
                    <div class="button">Zatwierdź</div>
                        
                    `;
                } else {
                    return "<div>Nie znaleziono takiego konia</div>";
                }
            }
        }
    };
</script>
