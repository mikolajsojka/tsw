<template>
    <div id="judge">
        <div class="panel" v-html="renderJudge()"></div>
    </div>
</template>

<script>
    export default {
        name: "Judge",

        methods: {
            renderJudge () {
                let judge;

                Array.from(this.$store.state.judges).forEach(element => {
                    if (element._id === this.$route.params.id) {
                        judge = element;
                    }
                });
                if (judge) {
                    return `
                    <div class="button delete">Usuń sędziego</div>
                    <div id="info">
                        <div id="first">
                        <label>Imię</label>
                        <input name="name" value="${judge.judge}"></input>
                        <label>Kraj</label>
                        <input name="country" value="${judge.country}"></input>
                        </div>  

                    </div>
                    <div class="button">Zatwierdź</div>
                        
                    `;
                } else {
                    return "<div>Nie znaleziono takiego sędziego</div>";
                }
            }
        }

    };
</script>
