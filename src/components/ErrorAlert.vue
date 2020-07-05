<template>
    <div id="error_alert">
        <b-alert :show="error.length>0" variant="warning">{{error}}</b-alert>
    </div>
</template>

<script>
    export default {
        name: "ErrorAlert",
        props: {
            error: String
        }
    }
</script>

<style scoped>

</style>