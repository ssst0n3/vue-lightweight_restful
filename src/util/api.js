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
    async exec(method, path, params, data, caller, extra_msg) {
        console.log("caller:", caller)
        return this.client({
            url: path, method: method, params: params, data: data
        }).then(req => {
            if (caller) {
                console.log("msg:", req.data.msg)
                if (req.data.msg) {
                    let msg = req.data.msg
                    if (extra_msg) {
                        msg += extra_msg
                    }
                    caller.$bvToast.toast(msg, {
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
                        let msg = error.response.data.reason
                        if (extra_msg) {
                            msg += extra_msg
                        }
                        caller.$bvToast.toast(msg, {
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
    async get(path, params, caller, extra_msg) {
        return this.exec('get', path, params, null, caller, extra_msg)
    },
    async post(path, params, data, caller, extra_msg) {
        return this.exec('post', path, params, data, caller, extra_msg)
    },
    async put(path, params, data, caller, extra_msg) {
        return this.exec('put', path, params, data, caller, extra_msg)
    },
    async delete(path, params, caller, extra_msg) {
        return this.exec('delete', path, params, null, caller, extra_msg)
    },
    async listResource(path, caller, extra_msg) {
        return this.get(path, null, caller, extra_msg)
    },
    async createResource(path, data, caller, extra_msg) {
        return this.post(path, null, data, caller, extra_msg)
    },
    async updateResource(path, id, data, caller, extra_msg) {
        return this.put(path + '/' + id, null, data, caller, extra_msg)
    },
    async deleteResource(path, id, caller, extra_msg) {
        if (confirm('Are you sure you want to delete it?')) {
            await this.delete(`${path}/${id}`, null, caller, extra_msg);
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
