<template>
    <div class="document-wrapper">
        <a title="Download">
            <Icon class="icon" image-file="download-solid.svg"/>
        </a>
    </div>
</template>

<script>
    import Icon from "@/components/Icon";

    export default {
        name: "DownloadDoc",
        components: {Icon},
    }
</script>

<style lang="sass" scoped>

    .document-wrapper
        display: inline-flex
        align-items: flex-start
        margin-top: 10px

        a
            display: inline

        .title
            font-size: .98em
            height: fit-content

        .icon
            height: 22px
            width: 22px
</style>