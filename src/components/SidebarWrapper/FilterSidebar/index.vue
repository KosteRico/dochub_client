<template>
    <div class="sidebar-item">
        <div class="title bottom-line">Тег</div>
        <div class="sidebar-item-content">
            <Tag text="Все"/>
            <Tag text="Ваши подписки"/>
            <ChosenTagWrapper/>
            <input type="search" class="search-box content-item" placeholder="Найти тег">
        </div>
    </div>

</template>

<script>
    import ChosenTagWrapper from "@/components/SidebarWrapper/FilterSidebar/ChosenTagWrapper/index"
    import Tag from "@/components/SidebarWrapper/Tag";

    export default {
        components: {Tag, ChosenTagWrapper}
    }
</script>

<style lang="sass" scoped>

    @import "../../../assets/sass/variables"

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
            font-size: inherit
            padding: 0

            color: #222
            width: inherit
            margin-bottom: 10px


        .sidebar-item-content
            margin-top: .4em
            font-size: .85em


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