<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    import store from "@/store";
    import axios from "axios"
    import router from "@/router"

    export default {
        name: 'App',
        metaInfo: {
            title: "Home",
            titleTemplate: "%s | Dochub"
        },
        components: {},
        data() {
            return {}
        },
        methods: {
            closeAlert() {
                this.$store.commit('stopAlert')
            }
        },
        created: function () {
            this.$http.interceptors.response.use((resp) => resp, function (err) {
                const code = err.response.status

                const originalRequest = err.config

                const isRefresh = originalRequest.url.endsWith("/refresh")

                console.log(`Is refresh? ${isRefresh}, path: ${originalRequest.url}`)

                console.log('Unauthorized, code: ' + code)
                if (code === 401 && !originalRequest._retry) {
                    originalRequest._retry = true
                    console.log('Unauthorized #2')

                    return store.dispatch('refresh')
                        .then(function () {
                            originalRequest.headers['Authorization'] = `Bearer ${store.getters.getAccess}`
                            console.log('Header before new try: ' + originalRequest.headers['Authorization'])

                            return axios.request(originalRequest);
                        }).catch(function (err) {
                            router.replace('login')
                            console.log("After refresh inside App.vue: " + err)
                        })
                }

                return new Promise((resolve, reject) => {
                    reject(err)
                })

            })
        }
    }
</script>

<style lang="sass">



.menu-list > li > a
    border-radius: 20px

html
    min-height: 100%
    height: auto
    background-color: #fafafa !important

#app, body
    height: 100%

._loading
    position: relative

</style>
