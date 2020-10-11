<template>
    <div id="auth">
        <span v-if="loggedIn" class="mr-3">welcome {{username}}</span>
        <b-button @click="$bvModal.show('sign')" v-if="!loggedIn">sign</b-button>
        <b-button v-if="loggedIn" @click="logout">logout</b-button>
        <b-modal id="sign" @ok="sign_in" @cancel="register" title="sign" :content-class="theme"
                 cancel-variant="primary" cancel-title="register" ok-title="login"
                 :header-close-variant="dark?'light':''">
            <div :class="theme">
                <b-input-group prepend="username" :class="dark?'theme_black':''">
                    <b-form-input autofocus type="text" v-model="model.username" :class="theme"></b-form-input>
                </b-input-group>
                <b-input-group prepend="password" :class="'mt-3 '+(dark?'theme_black':'')">
                    <b-form-input type="password" v-model="model.password" :class="theme"></b-form-input>
                </b-input-group>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Vue from 'vue'

    import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import VueCookies from 'vue-cookies'
    import api from "@/util/api";

    Vue.use(BootstrapVue)
    Vue.use(IconsPlugin)

    Vue.use(VueCookies)

    export default {
        name: "Auth",
        data: function () {
            return {
                model: {},
                loggedIn: api.loggedIn()
            }
        },
        props: {
            base_url: String,
            auth_uri: String,
            dark: Boolean,
            cookie_expire_time: Number,
        },
        created() {
            api.initClient(this.base_url)
        },
        computed: {
            username: function () {
                return this.loggedIn ? api.username() : ''
            },
            theme() {
                return this.dark ? ['shadow', 'bg-dark', 'text-light', 'theme_black'] : []
            }
        },
        methods: {
            async sign_in() {
                let {token, username, is_admin, user_id} = await api.post(this.auth_uri, null, this.model)
                this.$cookies.set('token', token, this.cookie_expire_time)
                this.$cookies.set('username', username, this.cookie_expire_time)
                this.$cookies.set('is_admin', is_admin, this.cookie_expire_time)
                this.$cookies.set('user_id', user_id, this.cookie_expire_time)
                this.loggedIn = api.loggedIn()
            },
            async register() {
              // TODO
              alert('register todo')
            },
            logout() {
                api.logout()
                this.loggedIn = api.loggedIn()
            }
        }
    }
</script>

<style>
    .theme_black > .input-group-prepend > .input-group-text {
        background-color: #343a40;
        color: white;
        /*background: rgba(255, 255, 255, 0.6) !important;*/
        /*box-shadow: 0 40px 120px -2px rgba(27, 33, 58, 1);*/
    }

</style>
<style scoped>

</style>