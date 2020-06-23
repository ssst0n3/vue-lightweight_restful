import Auth from "@/components/Auth";
import HelloWorld from "@/components/HelloWorld";

const components = [
    Auth,
    HelloWorld
]

const install = function (Vue) {
    components.forEach(c => {
        Vue.component(c.name, c);
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const b = {
    install,
    ...components,
}

export default b