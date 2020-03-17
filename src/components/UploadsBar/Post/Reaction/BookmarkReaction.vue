<template>
    <Reaction :icon-files="iconFiles"/>
</template>

<script>
    import Reaction from "@/components/UploadsBar/Post/Reaction/index";

    export default {
        name: "BookmarkReaction",
        components: {Reaction},
        data() {
            return {
                iconFiles: {
                    active: "bookmark-solid.svg",
                    inactive: "bookmark-regular.svg"
                }
            }
        }
    }
</script>
