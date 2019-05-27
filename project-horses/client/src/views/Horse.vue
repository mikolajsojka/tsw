<template>
    <div id="horse">
        <div v-html="renderhorse()"></div>
    </div>
</template>

    <script>
    export default {
        name: "Horse",
        methods: {
            renderhorse () {
                return "<b>test</b>";
            }
        }
    };
</script>
