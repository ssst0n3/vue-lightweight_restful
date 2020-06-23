import Vue from 'vue'
import Demo from "@/Demo";
Vue.config.productionTip = false;

import lightweight_restful from "./components/main";
Vue.use(lightweight_restful)
// eslint-disable-next-line no-console
console.log(lightweight_restful)

new Vue({
    render: h => h(Demo),
}).$mount('#app');
