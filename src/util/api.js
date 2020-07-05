import VueCookies from 'vue-cookies'
import axios from 'axios'
import consts from "@/util/consts";

export default {
    config: {
        json: true,
        withCredentials: true,
    },
    client: {},
    initClient(baseURL = "/") {
        this.config.baseURL = baseURL
        this.client = axios.create(this.config)
    },
    async exec(method, path, params, data) {
        return this.client({
            url: path, method: method, params: params, data: data
        }).then(req => {
            return req.data
        })
    },
    async get(path, params) {
        return this.exec('get', path, params)
    },
    async post(path, params, data) {
        return this.exec('post', path, params, data)
    },
    logout() {
        VueCookies.remove(consts.cookie.token)
        VueCookies.remove(consts.cookie.username)
        VueCookies.remove(consts.cookie.is_admin)
        VueCookies.remove(consts.cookie.user_id)
    },
    loggedIn() {
        return VueCookies.isKey(consts.cookie.token)
    },
    username() {
        return VueCookies.get(consts.cookie.username)
    }
}
