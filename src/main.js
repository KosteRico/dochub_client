import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Buefy from 'buefy'
import './buefy-custom.scss'
import {v4 as uuid} from 'uuid'

Vue.config.productionTip = false;

Vue.prototype.$uuid = uuid

Vue.prototype.$http = Axios.create({
    baseURL: "http://localhost:8000/api/"
});

const accessToken = localStorage.getItem("accessToken")

if (accessToken) {

    Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

Vue.use(Buefy)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
