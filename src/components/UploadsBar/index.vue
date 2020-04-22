<template>
    <div class="uploads middle-width">
        <!--        <UploadsTitle :title="count"/>-->
        <SubscribeBox @click-follow="clickFollow" v-bind:is-followed="followed"/>
        <PostWrapper/>
    </div>
</template>

<script>
    import SubscribeBox from "@/components/UploadsBar/SubscribeBox";
    import PostWrapper from "@/components/UploadsBar/PostWrapper/index";
    //import UploadsTitle from "@/components/UploadsBar/UploadsTitle";

    export default {
        components: {
            PostWrapper,
            SubscribeBox,
            // UploadsTitle,
        },
        data() {
            return {
                followed: false
            }
        },
        methods: {
            clickFollow() {
                this.followed = !this.followed
            }
        }
    }
</script>

<style lang="sass" scoped>
    .uploads
        margin: 0 0 1em
        height: fit-content

</style>