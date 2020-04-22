<template>
    <div id="app">
        <router-view/>
        <AlertBox
                v-if="this.$store.getters.getAlertInfo.visible"
                @close="closeAlert"
                :variant="this.$store.getters.getAlertInfo.variant"
                :text="this.$store.getters.getAlertInfo.text"
        />
    </div>
</template>

<script>

    import store from "@/store";
    import axios from "axios"
    import router from "@/router"
    import AlertBox from "@/components/AlertBox";


    export default {
        name: 'App',
        components: {
            AlertBox,
        },
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
@import "assets/css/normalize.css"
@import "assets/css/default.css"
@import "assets/sass/variables"

.alert-message
    position: absolute
    left: 10px
    bottom: 10px

*
    box-sizing: border-box

body
    font-size: 1.5em
    line-height: 1.6
    font-weight: 400
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif
    background-color: #fafafa
    color: #222

/*.button, button, input[type="submit"], input[type="reset"], input[type="button"]*/
/*    display: inline-block*/
/*    height: 38px*/
/*    padding: 0 30px*/
/*    color: #555*/
/*    text-align: center*/
/*    font-size: 11px*/
/*    font-weight: 600*/
/*    line-height: 38px*/
/*    letter-spacing: .1rem*/
/*    text-transform: uppercase*/
/*    text-decoration: none*/
/*    white-space: nowrap*/
/*    background-color: transparent*/
/*    border-radius: 25px*/
/*    border: 1px solid #bbb*/
/*    cursor: pointer*/
/*    box-sizing: border-box*/

.container
    padding: 0 20px
    width: 100%
    margin: 0 auto
    max-width: 972px

.middle-width
    min-width: 50%
    max-width: 500px

.flex-align-center
    display: flex
    align-items: center

.full-width
    width: 100%

.content
    display: flex
    flex-direction: row
    padding-top: 1.4em
    margin-top: .5em

.title
    padding: 1px
    font-weight: bold
    font-size: 1.2em
    display: block

    &::first-letter
        text-transform: uppercase

.top-line
    border-top: 1.3px solid #e2e2e2

.bottom-line
    border-bottom: 1.3px solid #e2e2e2

.bottom-line-bold
    border-bottom: 1.45px solid #e2e2e2

.under-title
    font-size: .77em
    color: rgba(34, 34, 34, .7)
    margin-top: -7px
    text-decoration: none

.tag
    display: block
    color: rgba(34, 34, 34, .7)

    &::first-letter
        text-transform: uppercase

    &::after
        content: ","

    &:last-child
        &::after
            content: ""

    margin-right: 8px

    &:hover
        color: rgba(34, 34, 34, .7)
        text-decoration: underline

.description
    font-size: .95em


.user-select-none
    user-select: none
    -moz-user-select: none
    -ms-user-select: none
    -webkit-user-select: none


.link-animation
    transition: background .1s

    &:hover
        color: $a-hover-color

    &.active
        background: rgba(230, 230, 230, .8)

.link-animation-light
    transition: background .15s

    &:hover
        background: rgba(230, 230, 230, .4)

    &.active
        background: rgba(230, 230, 230, .4)


.page-box-mb
    margin-bottom: 1.4em

.page-box
    padding: 10px
    margin-bottom: 1.4em
    background: white
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px
    border-radius: 10px

    &.primary
        border-radius: 0
        font-size: 1.1em

label
    display: block
    margin-bottom: .5rem
    font-weight: normal
    user-select: none

</style>
