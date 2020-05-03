<template>
    <b-menu-item
            :label="text"
            tag="router-link"
            class="menu-list-cust is-capitalized"
            active-class="is-active"
            :to="toPath"
    ></b-menu-item>
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

</style>