<template>
    <div class="uploads middle-width">
<!--        <UploadsTitle title="Welcome"/>-->
        <PostWrapper :posts="posts"/>
    </div>
</template>

<script>
    import PostWrapper from "@/components/UploadsBar/PostWrapper"
    // import UploadsTitle from "@/components/UploadsBar/UploadsTitle";

    export default {
        name: "HomeUploadsBar",
        components: {
            // UploadsTitle,
            PostWrapper
        },
        data() {
            return {
                posts: []
            }
        },
        methods: {},
        mounted() {
            console.log("HomeUploadsBar was mounted")

            this.$http({url: `/users/${this.$store.getters.getUsername}/subscriptions/posts`})
                .then(resp => {
                    const posts_ = resp.data.posts

                    if (posts_ === null || posts_.length === 0) {
                        return
                    }

                    for (let i = 0; i < posts_.length; i++) {
                        this.posts.push(posts_[i])
                    }
                })

            console.log("executed")
        }
    }
</script>

<style scoped>

</style>