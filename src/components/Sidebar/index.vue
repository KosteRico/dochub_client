<template>
    <div class="sidebar-wrapper">
        <div class="sidebar">
            <div class="sidebar-item">
                <div class="title bottom-line">Тег</div>
                <div class="sidebar-item-content">
                    <a class="content-item link-animation active">Все</a>
                    <ChosenTagWrapper/>
                    <input type="search" class="search-box content-item" placeholder="Найти тег">
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import ChosenTagWrapper from "@/components/Sidebar/ChosenTagWrapper"

    export default {
        components: {ChosenTagWrapper}
    }
</script>

<style lang="sass" scoped>

    @import "../../assets/sass/variables"

    .sidebar-wrapper
        font-size: 1.1em
        width: $side-width
        height: fit-content
        margin-right: 1em
        border: none
        // display: inline-box

        .sidebar
            position: fixed
            width: inherit

        .link
            display: block
            padding: .4em 0
            text-decoration: none
            color: #4e4e4e
            width: inherit

        .caret
            float: right
            margin-top: 5px

        .sidebar-item
            width: 100%
            padding-right: 1em

    .sidebar-item

        .title
            color: #222
            width: inherit
            margin-bottom: 10px


        .sidebar-item-content
            margin-top: .4em
            font-size: .85em

            *
                margin-bottom: 10px

            .content-item
                width: 100%
                padding: 3px 6px

            input.content-item
                max-height: 29px

            a.content-item
                cursor: pointer
                display: block
                color: inherit
                border-radius: 5px

        &.disabled
            opacity: .6
            cursor: not-allowed


</style>