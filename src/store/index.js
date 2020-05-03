import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import * as helper from './helpers'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || '',
        refreshToken: localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken") || '',
    },
    getters: {
        isLoggedIn(state) {
            console.log('Is logged in: ' + state.accessToken + ', ' + state.refreshToken)
            return !!state.accessToken && !!state.refreshToken
        },
        getRefresh: state => state.refreshToken,
        getAccess: state => state.accessToken,
    },
    mutations: {
        auth_success(state, d) {
            console.log('Success\n' + d.accessToken + '\n' + d.refreshToken)
            state.accessToken = d.accessToken
            state.refreshToken = d.refreshToken
        },
        refresh(state, d) {
            state.accessToken = d.accessToken
            state.refreshToken = d.refreshToken
        },
        clear(state) {
            state.accessToken = ''
            state.refreshToken = ''
        }
    },
    actions: {
        login({commit}, d) {
            console.log(d)
            return new Promise((resolve, reject) => {
                axios({url: 'http://localhost:8000/api/users/login', data: d.user, method: 'POST'})
                    .then(resp => {
                        const accessToken = resp.data.account.token.access_token
                        const refreshToken = resp.data.account.token.refresh_token

                        console.log(accessToken)
                        console.log(refreshToken)

                        helper.saveToStorage(d.remember, accessToken, refreshToken)

                        Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + accessToken
                        commit('auth_success', {accessToken, refreshToken})

                        resolve(resp)
                    })
                    .catch(err => {
                        console.log('Error')
                        reject(err)
                    })
            })

        },
        register({commit}, d) {
            return new Promise((resolve, reject) => {
                axios({baseURL: 'http://localhost:8000/api/users/new', data: d.user, method: 'POST'})
                    .then(resp => {
                        const accessToken = resp.data.account.token.access_token
                        const refreshToken = resp.data.account.token.refresh_token

                        helper.saveToStorage(d.remember, accessToken, refreshToken)
                        Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + accessToken
                        commit('auth_success', {accessToken, refreshToken})

                        resolve(resp)
                    })
                    .catch(err => {
                        helper.clearStorage()
                        reject(err)
                    })
            })
        },
        refresh({commit, state}) {
            console.log('Before refresh')
            return new Promise((resolve, reject) => {

                const instance = axios.create()

                instance.defaults.headers.common['Authorization'] = `Bearer ${state.refreshToken}`

                instance({url: `http://localhost:8000/api/refresh`, method: "GET"})
                    .then(resp => {
                        const accessToken = resp.data.token.access_token
                        const refreshToken = resp.data.token.refresh_token

                        console.log('Refreshing token')

                        if (helper.isSessionStorage()) {
                            helper.updateSessionStorage(accessToken, refreshToken)
                        } else if (helper.isLocalStorage()) {
                            helper.updateLocalStorage(accessToken, refreshToken)
                        } else {
                            reject("Both storages are empty!!!")
                        }

                        commit('refresh', {accessToken, refreshToken})

                        Vue.prototype.$http.defaults.headers.common["Authorization"] = `Bearer ${state.accessToken}`

                        resolve(resp)
                    })
                    .catch(err => {
                        console.log('After refresh inside store.js: ' + err)
                        helper.clearStorage()

                        commit('clear')

                        reject()
                    })
            })
        },
    }
})