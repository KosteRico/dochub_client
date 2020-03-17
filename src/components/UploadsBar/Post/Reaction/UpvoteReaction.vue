<template>
    <Reaction :icon-files="iconFiles"/>
</template>

<script>
    import Reaction from "@/components/UploadsBar/Post/Reaction/index";

    export default {
        name: "UpvoteReaction",
        components: {Reaction},
        data() {
            return {
                iconFiles: {
                    active: "thumbs-up-solid.svg",
                    inactive: "thumbs-up-regular.svg"
                }
            }
        }
    }
</script>