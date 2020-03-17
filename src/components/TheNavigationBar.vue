<template>
    <nav>
        <div class="container">
            <div class="nav-container">
                <div class="logo">
                    <h3>Logo</h3>
                </div>
                <div class="search-box-wrapper flex-align-center">
                    <input type="search" class="search-box" placeholder="Search...">
                    <Icon image-file="bell-solid.svg"/>
                </div>
                <div class="login-wrapper flex-align-center">
                    <Icon image-file="user-solid.svg"/>
                </div>
            </div>
        </div>
    </nav>

</template>

<script>
    import Icon from "@/components/Icon";

    export default {
        name: "TheNavigationBar",
        components: {Icon}
    }
</script>

<style lang="sass" scoped>
    @import "../assets/sass/variables"

    .logo
        margin-right: 1em
        width: $side-width
        position: relative

        h3
            margin: 0
            position: absolute
            width: fit-content
            cursor: pointer
            left: 0
            bottom: 0


    nav
        /*border-bottom: 1px solid #6796cd*/
        position: fixed
        top: 0
        height: 48px
        color: red
        width: 100%
        background-color: #77baf8
        box-shadow: 0 .3px 4px 0 rgba(119, 186, 248, 1)

        .nav-container
            height: inherit
            display: flex
            justify-content: flex-start
            flex-direction: row

        .container
            height: inherit

        .nav-link
            cursor: pointer

        .search-box
            width: 290px
            max-height: 29px
            margin-left: 0 !important

        .login-wrapper
            padding-left: 8px

        .icon
            cursor: pointer

        .search-box-wrapper
            display: flex
            flex-grow: 1

            *
                margin-left: 25px

</style>