<template>
    <div>
        <b-button @click="$bvModal.show('sign-in')">login</b-button>
        <b-button>logout</b-button>
        <b-modal id="sign-in" @ok="sign_in" title="login">
            <div style="">
                <b-input-group prepend="username">
                    <b-form-input type="text" v-model="model.username"></b-form-input>
                </b-input-group>
                <b-input-group prepend="password" style="margin-top: 5%">
                    <b-form-input type="password" v-model="model.password"></b-form-input>
                </b-input-group>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

    Vue.use(BootstrapVue)
    Vue.use(IconsPlugin)
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import api from "@/api/api";

    export default {
        name: "Auth",
        data: function () {
            return {
                model: {}
            }
        },
        props: {
            baseURL: String,
        },
        created() {
            api.initClient(this.baseURL)
        },
        methods: {
            async sign_in() {
                await api.post('/api/v1/auth', null, this.model)
            }
        }
    }
</script>

<style scoped>

</style>