<template>
    <div class="top-box bottom-line page-box-mb">
        <div class="top-wrapper">
            <div class=""><span>Результатов:</span> {{title}}</div>
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
        max-height: 27px
        font-size: 1.1em
        padding-top: 0

    span
        font-weight: bold

</style>