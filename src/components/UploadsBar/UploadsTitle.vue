<template>
    <div class="top-box bottom-line page-box-mb">
        <div class="top-wrapper">
            <div class="title">{{title}}</div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "UploadsTitle",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="sass" scoped>
    .top-box
        font-size: 1.1em
        padding-top: 0

</style>