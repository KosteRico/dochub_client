<template>
    <b-navbar
            wrapper-class="container"
            :key="componentKey"
            :fixed-top="true"
            :shadow="true"
            :close-on-click="false"
            :spaced="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="div">
                <b-autocomplete v-model="searchQuery" @keyup.enter.native="search" placeholder="Search..."
                                icon="magnify"
                                rounded></b-autocomplete>
            </b-navbar-item>
            <b-navbar-item tag="div">
                <b-tooltip class="navbar-fullwidth" label="Добавить файл" type="is-light" position="is-bottom" animated
                           :delay="500">
                    <b-button
                            @click="createPost"
                            tag="a"
                            class="navbar-fullwidth"
                            type="is-info"
                            icon-pack="fas"
                            icon-left="plus"/>
                </b-tooltip>
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-dropdown :label="$store.getters.getUsername" :hoverable="true" :boxed="true" :collapsible="true">
                <b-navbar-item class="_with-icon" @click="logout">
                    <b-icon icon="logout"></b-icon>
                    <span>Logout</span>
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>

<script>
    import {clearStorage} from "@/store/helpers"
    import AddPost from "@/components/UploadsBar/PostWrapper/AddPost";

    export default {
        name: "NewNavbar",
        data() {
            return {
                componentKey: 1,
                searchQuery: ''
            }
        },
        methods: {
            logout() {
                clearStorage()
                this.$router.replace('/login')
            },
            createPost() {
                this.$buefy.modal.open({
                    parent: this,
                    component: AddPost,
                    trapFocus: true,
                    canCancel: ['x', 'outside']
                })
            },
            search() {
                // console.log(this.searchQuery)

                let tempQ = this.searchQuery.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"")

                if (tempQ.trim() === "") {
                    return
                }
                this.$router.push({name: 'search', query: {q: this.searchQuery}})
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/mixins.sass"

.icon._bookmark
    margin-left: -0.25em

.navbar-item._with-icon > .icon
    margin-right: 0.1875em

.navbar-fullwidth
    @include touch
        width: 100%

</style>