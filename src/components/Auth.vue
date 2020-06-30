<template>
    <div>
        <b-button @click="$bvModal.show('sign-in')" v-if="!loggedIn">login</b-button>
        <b-button v-if="loggedIn">logout</b-button>
        <b-modal id="sign-in" @ok="sign_in" title="login" :content-class="theme" :header-close-variant="dark?'light':''">
            <div :class="theme">
                <b-input-group prepend="username" :class="dark?'black':''">
                    <b-form-input type="text" v-model="model.username" :class="theme"></b-form-input>
                </b-input-group>
                <b-input-group prepend="password" :class="'mt-3 '+(dark?'black':'')">
                    <b-form-input type="password" v-model="model.password" :class="theme"></b-form-input>
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
            authURI: String,
            loggedIn: Boolean,
            dark: Boolean,
        },
        created() {
            api.initClient(this.baseURL)
        },
        computed: {
            theme() {
                return this.dark? ['shadow', 'bg-dark', 'text-light', 'black']:[]
            }
        },
        methods: {
            async sign_in() {
                await api.post(this.authURI, null, this.model)
            }
        }
    }
</script>

<style scoped>
    /deep/ .black > .input-group-prepend > .input-group-text {
        background-color: #343a40;
        color: white;
        /*background: rgba(255, 255, 255, 0.6) !important;*/
        /*box-shadow: 0 40px 120px -2px rgba(27, 33, 58, 1);*/
    }
</style>