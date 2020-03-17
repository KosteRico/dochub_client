<template>
    <div class="icon" :style="{background : image }"></div>
</template>

<script>
    export default {
        name: "Icon",
        props: {
            imageFile: String
        },
        data: function () {
            return {}
        },
        methods: {
            getImageUrl(imgName) {
                return `url(${require('@/assets/images/' + imgName)})`
            }
        },
        computed: {
            image() {
                return this.getImageUrl(this.imageFile) + " no-repeat"
            }
        }
    }
</script>

<style lang="sass" scoped>
    .icon
        height: 23px
        width: 23px
        margin: 3px

        &.large
            height: 40px
            width: 40px

</style>