<template>
    <div class="content-item sidebar-tag">
        <a
                @click="$emit('remove-item', id)"
                class="remove"
                title="Удалить тег"
        >✕</a>{{name}}
    </div>
</template>

<script>
    export default {
        name: "ChosenTag",
        props: {
            id: {
                type: Number,
                required: true
            },
            name: String
        }
    }
</script>

<style lang="sass" scoped>

    @import "../../../assets/sass/variables"

    .remove
        color: #222
        cursor: pointer
        user-select: none
        margin-left: -17px
        margin-right: 6px
        font-weight: normal
        transition: color .1s

        &:hover
            color: $a-hover-color
            text-decoration: none


    .sidebar-tag
        font-size: .95em
        padding-left: 6px
        font-weight: bold

        &:hover
            text-decoration: none
</style>