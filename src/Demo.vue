<template>
    <div id="app">
        <Auth base_url="https://127.0.0.1:9101" :dark="true" auth_uri="/api/v1/auth"></Auth>
        <!--    <img alt="Vue logo" src="./assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <div class="col">
            <b-form-tags class="bg-dark theme_black"></b-form-tags>
        </div>
        <div class="col">
        </div>
    </div>
</template>

<script>
    import lightweight_restful from "./components/main";

    export default {
        name: 'App',
        components: {
        },
        methods: {
            logout() {
                lightweight_restful.api.logout()
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
