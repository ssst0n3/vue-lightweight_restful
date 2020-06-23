<template>
    <div>
        <b-button @click="$bvModal.show('sign-in')">login</b-button>
        <b-button>logout</b-button>
        <b-modal id="sign-in">
            <div style="margin-top: 12%; margin-left: 5%; margin-right: 5%">
                <b-input-group prepend="username">
                    <b-form-input type="text" v-model="model.username"></b-form-input>
                </b-input-group>
                <b-input-group prepend="password" style="margin-top: 5%">
                    <b-form-input type="password" v-model="model.password"></b-form-input>
                </b-input-group>
                <div style="margin-top: 5%; text-align: right">
                    <b-btn @click="$bvModal.hide('sign-in')">cancel</b-btn>
                    <b-btn @click="sign_in" style="margin-left: 10%">login</b-btn>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
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
        methods: {
            async sign_in() {
                api.initClient("/xxx")
                await api.createResource('auth', this.model)
            }
        }
    }
</script>

<style scoped>

</style>