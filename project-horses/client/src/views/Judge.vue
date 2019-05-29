<template>
    <div id="judge">
        <div class="panel">
            <div class="button delete" @click="deletejudge">Usuń sędziego</div>
            <div class="main" v-html="renderJudge()"></div>
            <div class="button">Zatwierdź</div>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Judge",
        data () {
            return {
                deletecheck: 0
            };
        },
        methods: {
            deletejudge () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.$store.dispatch("DELETE_JUDGE", this.$route.params.id);
                } else {
                }

                this.deletecheck = 1;
            },
            renderJudge () {
                let judge;

                Array.from(this.$store.state.judges).forEach(element => {
                    if (element._id === this.$route.params.id) {
                        judge = element;
                    }
                });
                if (judge) {
                    return `
                    
                    <div id="info">
                        <div id="first">
                        <label>Imię</label>
                        <input name="name" value="${judge.judge}"></input>
                        <label>Kraj</label>
                        <input name="country" value="${judge.country}"></input>
                        </div>  

                    </div>
                    
                        
                    `;
                } else {
                    router.push("/main");
                    if (!this.deletecheck) {
                        alert("Nie znaleziono takiego sędziego");
                    }
                }
            }
        }
    };
</script>
