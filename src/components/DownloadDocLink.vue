<template>
    <div class="media">
        <div class="media-left">
            <b-icon pack="fas" icon="file"></b-icon>
        </div>
        <div class="media-content"><a></a></div>
    </div>
</template>

<script>

    export default {
        name: "DownloadDocLink",
        data() {
            return {

            }
        },
        props: {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
    }
</script>

<style scoped>

</style>