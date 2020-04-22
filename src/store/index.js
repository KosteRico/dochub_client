import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import * as helper from './helpers'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || '',
        refreshToken: localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken") || '',
        username: localStorage.getItem("username") || sessionStorage.getItem("username") || '',
        alertInfo: {
            text: "",
            variant: "",
            visible: false
        }
    },
    getters: {
        isLoggedIn(state) {
            console.log('Is logged in: ' + state.accessToken + ', ' + state.refreshToken)
            return !!state.accessToken && !!state.refreshToken
        },
        getUsername: (state) => state.username,
        getRefresh: state => state.refreshToken,
        getAccess: state => state.accessToken,
        getAlertInfo: state => state.alertInfo
    },
    mutations: {
        auth_success(state, d) {
            console.log('Success\n' + d.accessToken + '\n' + d.refreshToken)
            state.accessToken = d.accessToken
            state.refreshToken = d.refreshToken
            state.username = d.username
        },
        refresh(state, d) {
            state.accessToken = d.accessToken
            state.refreshToken = d.refreshToken
        },
        clear(state) {
            state.accessToken = ''
            state.refreshToken = ''
            state.username = ''
        },
        startAlert(state, d) {
            state.alertInfo.text = d.message
            state.alertInfo.variant = d.variant
            state.alertInfo.visible = true
        },
        stopAlert(state) {
            state.alertInfo.visible = false
            state.alertInfo.text = ''
            state.alertInfo.variant = ''
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
                        const username = resp.data.account.username

                        console.log(accessToken)
                        console.log(refreshToken)
                        console.log(username)

                        helper.saveToStorage(d.remember, accessToken, refreshToken, username)

                        Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + accessToken
                        commit('auth_success', {accessToken, refreshToken, username})

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
                axios({url: 'http://localhost:8000/users/new', data: d.user, method: 'POST'})
                    .then(resp => {
                        const accessToken = resp.data.account.token.access_token
                        const refreshToken = resp.data.account.token.refresh_token
                        const username = resp.data.account.username

                        helper.saveToStorage(d.remember, accessToken, refreshToken, username)
                        Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + accessToken
                        commit('auth_success', {accessToken, refreshToken, username})

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

                instance({url: `http://localhost:8000/api/users/${state.username}/refresh`, method: "GET"})
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