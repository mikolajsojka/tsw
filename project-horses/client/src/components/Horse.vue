<template>
    <div id="info">
        <div id="first">
            <label>Imię</label>
            <input name="name" value="${horse.name}"/>
            <label>Numer startowy</label>
            <input name="number" value="${horse.number}"/>
            <label>Kraj Pochodzenia</label>
            <input name="country" value="${horse.country}"/>
            <label>Data urodzenia</label>
            <input name="yob" value="${horse.yob}"/>
            <label>Sierść</label>
            <input name="hair" value="${horse.hair}"/>
            <label>Płeć</label>
            <input name="sex" value="${horse.sex}"/>
            <label>Klasa startowa</label>
            ${classes}
        </div>

        <div id="second">
            <label>Rodowód - Ojciec</label>
            <input name="bloodline-father" value="${
                        horse.bloodline.father.name
                    }"/>
            <input name="bloodline-father" value="${
                        horse.bloodline.father.country
                    }"/>
            <label>Rodowód - Matka</label>
            <input name="bloodline-mother" value="${
                        horse.bloodline.mother.name
                    }"/>
            <input name="bloodline-mother" value="${
                        horse.bloodline.mother.country
                    }"/>
            <label>Rodowód - Ojciec Matki</label>
            <input name="bloodline-father-mother" value="${
                        horse.bloodline.fathermother.name
                    }"/>
            <input name="bloodline-father-mother" value="${
                        horse.bloodline.fathermother.country
                    }"/>
            <label>Hodowca</label>
            <input name="breeder-name" value="${
                        horse.breeder.name
                    }"/>
            <input name="breeder-country" value="${
                        horse.breeder.country
                    }"/>
            <label>Właściciel</label>
            <input name="owner-name" value="${
                        horse.owner.name
                    }"/>
            <input name="owner-country" value="${
                        horse.owner.country
                    }"/>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Horse",
        props: {
            horse: {},
            classes: String
        }

    };

</script>
