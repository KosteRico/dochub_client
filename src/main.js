import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueMeta from 'vue-meta'
import Buefy, {ToastProgrammatic as Toast} from 'buefy'
import './buefy-custom.scss'
import './assets/css/default.css'
import './assets/sass/variables.sass'
import {v4 as uuid} from 'uuid'

Vue.config.productionTip = false;

Vue.prototype.$uuid = uuid

Vue.prototype.$http = Axios.create({
    baseURL: "http://localhost:8000/api/"
});

Vue.use(Buefy)
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})

Vue.prototype.$toast = params => Toast.open({
    position: "is-bottom-left",
    ...params
})

const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || null

if (accessToken) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
