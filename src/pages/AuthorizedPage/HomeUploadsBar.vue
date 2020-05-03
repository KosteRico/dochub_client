<template>
    <div class="_loading">
        <PostWrapper :posts="posts"/>
        <b-loading :active.sync="loading" :can-cancel="false" :is-full-page="false"/>
    </div>
</template>

<script>
    import PostWrapper from "@/components/UploadsBar/PostWrapper";
    import loading from "@/mixins/loading";

    export default {
        name: "HomeUploadsBar",
        components: {PostWrapper},
        data() {
            return {
                posts: []
            }
        },
        mixins: [loading],
        mounted() {
            console.log("HomeUploadsBar was mounted")

            this.$http({url: `/subscriptions`})
                .then(resp => {
                    const posts_ = resp.data.posts

                    if (posts_ === null || posts_.length === 0) {
                        return
                    }

                    for (let i = 0; i < posts_.length; i++) {
                        this.posts.push(posts_[i])
                        console.log(posts_[i].is_bookmarked)
                    }
                })

            console.log("executed")
        }
    }
</script>

<style scoped>

</style>