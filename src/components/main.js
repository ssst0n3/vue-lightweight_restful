import api from "@/util/api";
import Auth from "@/components/Auth";
import HelloWorld from "@/components/HelloWorld";
import ErrorAlert from "./ErrorAlert";
import '../css/black.css'
// import Vue from "vue"
// Vue.component(Auth.name, Auth)

const components = [
    Auth,
    HelloWorld,
    ErrorAlert,
]

const install = function (Vue) {
    // components.forEach(c => {
    //     Vue.component(c.name, c);
    // })
    Vue.prototype.$rest_api = api
    Vue.component(Auth.name, Auth)
    Vue.component(ErrorAlert.name, ErrorAlert)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const b = {
    install,
    ...components,
    api
}

export default b