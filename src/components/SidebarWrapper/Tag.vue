<template>
    <router-link :to="toPath"
                 active-class="active"
                 class="content-item link-animation"
                 @click="handleClick"
    ><div @click="handleClick">{{text}}</div>
    </router-link>
</template>

<script>
    export default {
        name: "Tag",
        props: {
            pKey: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                toPath: `/tags/${this.text}`
            }
        },
        methods: {
            handleClick() {
                console.log("Tag clicked: " + this.pKey)
                this.$emit('click-tag', this.$uuid())
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/variables"

    a.content-item
        text-decoration: none
        cursor: pointer
        display: block
        color: inherit
        border-radius: 5px
        margin-top: 4px

        div
            display: block
            &::before
                content: "#"

        &:hover
            color: $a-hover-color

        &.active
            color: inherit

    .content-item
        width: 100%
        padding: 3px 6px
</style>