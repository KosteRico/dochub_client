<template>
    <div id="app">
        <TheNavigationBar/>
        <div class="main container">
            <div class="content">
                <SideBar/>
                <UploadsBar/>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBar from "@/components/Sidebar/index";
    import TheNavigationBar from "@/components/TheNavigationBar";
    import UploadsBar from "@/components/UploadsBar/index";

    export default {
        name: 'App',
        components: {UploadsBar, TheNavigationBar, SideBar}
    }
</script>

<style lang="sass">
    @import "assets/css/normalize.css"
    @import "assets/css/default.css"
    @import "assets/sass/variables"

    *
        box-sizing: border-box

    body
        font-size: 1.5em
        line-height: 1.6
        font-weight: 400
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif
        background-color: #f5f5f5
        color: #222


    input[type="email"], input[type="number"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], input[type="password"], textarea
        margin: 0
        display: block
        transition: border .15s ease
        color: black
        appearance: none
        height: 38px
        padding: 6px 10px
        background-color: #fff
        border: 1px solid #D1D1D1
        border-radius: 4px
        box-shadow: none
        box-sizing: border-box

        &:focus, &:hover
            border: 1.2px solid #78c0e0
            outline: 0

    .button, button, input[type="submit"], input[type="reset"], input[type="button"]
        display: inline-block
        height: 38px
        padding: 0 30px
        color: #555
        text-align: center
        font-size: 11px
        font-weight: 600
        line-height: 38px
        letter-spacing: .1rem
        text-transform: uppercase
        text-decoration: none
        white-space: nowrap
        background-color: transparent
        border-radius: 4px
        border: 1px solid #bbb
        cursor: pointer
        box-sizing: border-box

    .container
        padding: 0 20px
        width: 100%
        margin: 0 auto
        max-width: 972px

        &.main
            margin-top: 55px


    .middle-width
        min-width: 50%
        width: 500px

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
        transition: background .15s

        &:hover
            background: rgba(230, 230, 230, .8)

        &.active
            background: rgba(230, 230, 230, .8)

    .link-animation-light
        transition: background .15s

        &:hover
            background: rgba(230, 230, 230, .4)

        &.active
            background: rgba(230, 230, 230, .4)


</style>
