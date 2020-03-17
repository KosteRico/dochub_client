<template>
    <div class="uploads middle-width">
        <UploadsTitle title="Results"/>
        <Post v-for="i in 6" :key="i"/>
    </div>
</template>

<script>
    import Post from "@/components/UploadsBar/Post/index";
    import UploadsTitle from "@/components/UploadsBar/UploadsTitle";

    export default {
        components: {
            UploadsTitle,
            Post
        }
    }
</script>

<style lang="sass" scoped>
    .uploads
        margin: 0 0 1em
        height: fit-content

        .page-box-mb
            margin-bottom: 1.4em

        .page-box
            margin-bottom: 1.4em
            background: white
            box-shadow: rgba(0, 0, 0, 0.08) 0 2px 4px
            border-radius: 10px

            &.primary
                border-radius: 0
                font-size: 1.1em

</style>