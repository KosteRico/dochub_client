<template>
    <b-navbar
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
                <b-autocomplete placeholder="Search..." icon-pack="fas"
                                icon="search"></b-autocomplete>
            </b-navbar-item>
            <b-navbar-item tag="div">
                <b-button type="is-primary" icon-pack="fas" icon-left="plus">
                    Добавить файл
                </b-button>
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-dropdown :label="$store.getters.getUsername" :hoverable="true" :boxed="true">
                <b-navbar-item>

                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>

<script>

    export default {
        name: "NewNavbar",
        data() {
            return {
                componentKey: 1
            }
        }
    }
</script>

<style lang="sass" scoped>

#navbar-search
    min-width: 150px
</style>