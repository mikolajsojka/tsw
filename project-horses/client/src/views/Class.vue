<template>
    <div id="class">
        <div class="panel" v-html="renderClass()"></div>
    </div>
</template>

<script>
    export default {
        name: "Class",
        methods: {
            renderClass () {
                let item;

                Array.from(this.$store.state.classes).forEach(element => {
                    if (element._id === this.$route.params.id) {
                        item = element;
                    }
                });
                if (item) {
                    return `
                    <div class="button delete">Usuń Klasę</div>
                    <div id="info">
                        <div id="first">
                        <label>Nazwa klasy</label>
                        <input name="name" value="${item.category}"></input>
                        </div>  

                    </div>
                    <div class="button">Zatwierdź</div>
                        
                    `;
                } else {
                    return "<div>Nie znaleziono takiej klasy</div>";
                }
            }
        }
    };
</script>
