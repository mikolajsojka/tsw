<template>
    <div class="main">
        <div class="first-main">Wprowadzaj wyniki</div>
        <div class="second-main">
            <div class="main-button">Konie</div>
            <div class="main-button">Sędziowie</div>
            <div class="main-button">Klasy</div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Main",
        created () {
            console.log(this.$store.state.user);
        }
    };
</script>
