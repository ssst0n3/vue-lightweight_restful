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
    async exec(method, path, params, data, caller) {
        return this.client({
            url: path, method: method, params: params, data: data
        }).then(req => {
            if (caller) {
                console.log("msg:", req.data.msg)
                if (req.data.msg) {
                    caller.$bvToast.toast(req.data.msg, {
                        title: path,
                        variant: 'success',
                        solid: true
                    })
                }
            }
            return req.data
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data) {
                    if (caller) {
                        caller.$bvToast.toast(error.response.data.reason, {
                            title: path,
                            variant: 'danger',
                            solid: true
                        })
                    }
                    return error.response.data
                }
                return error.response
            }
            return error
        })
    },
    async get(path, params, caller) {
        return this.exec('get', path, params, caller)
    },
    async post(path, params, data, caller) {
        return this.exec('post', path, params, data, caller)
    },
    async put(path, params, data, caller) {
        return this.exec('put', path, params, data, caller)
    },
    async delete(path, params, caller) {
        return this.exec('delete', path, params, caller)
    },
    async listResource(path, caller) {
        return this.get(path, null, caller)
    },
    async createResource(path, data, caller) {
        return this.post(path, null, data, caller)
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
