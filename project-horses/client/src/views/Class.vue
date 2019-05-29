<template>
    <div id="class">
        <div class="panel">
            <div class="button delete" @click="deleteclass">Usuń Klasę</div>
            <div class="main" v-html="renderClass()"></div>
            <div class="button">Zatwierdź</div>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Class",
        data () {
            return {
                deletecheck: 0
            };
        },
        methods: {
            deleteclass () {
                if (confirm("Czy na pewno chcesz usunąć?")) {
                    this.$store.dispatch("DELETE_CLASS", this.$route.params.id);
                } else {
                }

                this.deletecheck = 1;
            },
            renderClass () {
                let item;

                Array.from(this.$store.state.classes).forEach(element => {
                    if (element._id === this.$route.params.id) {
                        item = element;
                    }
                });
                if (item) {
                    return `
                    
                    <div id="info">
                        <div id="first">
                        <label>Nazwa klasy</label>
                        <input name="name" value="${item.category}"></input>
                        </div>  

                    </div>
                    
                        
                    `;
                } else {
                    router.push("/main");
                    if (!this.deletecheck) {
                        alert("Nie znaleziono takiej klasy");
                    }
                }
            }
        }
    };
</script>
