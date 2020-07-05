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
    async put(path, params, data) {
        return this.exec('put', path, params, data)
    },
    async delete(path, params) {
        return this.exec('delete', path, params)
    },
    async listResource(path) {
        return this.get(path)
    },
    async createResource(path, data) {
        return this.post(path, null, data)
    },
    async updateResource(path, id, data) {
        return this.put(path + '/' + id, null, data)
    },
    async deleteResource(path, id) {
        if (confirm('Are you sure you want to delete it?')) {
            await this.delete(`${path}/${id}`);
            location.reload()
        }
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
