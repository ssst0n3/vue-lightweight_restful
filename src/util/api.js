import VueCookies from 'vue-cookies'
import axios from 'axios'
import consts from "@/util/consts";

export default {
    config: {
        json: true,
        withCredentials: true,
    },
    client: {},
    initClient(baseURL = "/", withCredentials=true) {
        this.config.baseURL = baseURL
        this.config.withCredentials = withCredentials
        this.client = axios.create(this.config)
    },
    async exec(method, path, params, data, toast_options) {
        if (toast_options) {
            console.log("caller:", toast_options.caller)
            if (toast_options.error_msg === undefined) {
                toast_options.error_msg = ""
            }
            if (toast_options.success_msg === undefined) {
                toast_options.success_msg = ""
            }
        }

        return this.client({
            url: path, method: method, params: params, data: data
        }).then(req => {
            if (toast_options && toast_options.caller) {
                let msg = req.data.msg ? `${req.data.msg} ${toast_options.success_msg}` : toast_options.success_msg
                console.log("msg:", msg)
                toast_options.caller.$bvToast.toast(msg, {
                    title: path,
                    variant: 'success',
                    solid: true
                })
            }
            return req.data
        }).catch(function (error) {
            let ret = error.response ? (error.response.data ? error.response.data : error.response) : error
            if (toast_options.caller) {
                let msg = error.response ? `${error.response.data ? error.response.data.reason : ""} ${toast_options.error_msg}` : toast_options.error_msg
                console.log("msg:", msg)
                toast_options.caller.$bvToast.toast(msg, {
                    title: path,
                    variant: 'danger',
                    solid: true
                })
            }
            return ret
        })
    },
    async get(path, params, toast_options) {
        return this.exec('get', path, params, null, toast_options)
    },
    async post(path, params, data, toast_options) {
        return this.exec('post', path, params, data, toast_options)
    },
    async put(path, params, data, toast_options) {
        return this.exec('put', path, params, data, toast_options)
    },
    async delete(path, params, toast_options) {
        return this.exec('delete', path, params, null, toast_options)
    },
    async listResource(path, toast_options) {
        return this.get(path, null, toast_options)
    },
    async createResource(path, data, toast_options) {
        return this.post(path, null, data, toast_options)
    },
    async updateResource(path, id, data, toast_options) {
        return this.put(path + '/' + id, null, data, toast_options)
    },
    async deleteResource(path, id, toast_options) {
        if (confirm('Are you sure you want to delete it?')) {
            await this.delete(`${path}/${id}`, null, toast_options);
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
        console.log("token exists:", VueCookies.isKey(consts.cookie.token))
        return VueCookies.isKey(consts.cookie.token)
    },
    username() {
        return VueCookies.get(consts.cookie.username)
    }
}
