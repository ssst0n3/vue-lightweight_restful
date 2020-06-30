import api from "@/api/api";
import Auth from "@/components/Auth";
import HelloWorld from "@/components/HelloWorld";
// import Vue from "vue"
// Vue.component(Auth.name, Auth)

const components = [
    Auth,
    HelloWorld,
]

const install = function (Vue) {
    // components.forEach(c => {
    //     Vue.component(c.name, c);
    // })
    Vue.component(Auth.name, Auth)
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