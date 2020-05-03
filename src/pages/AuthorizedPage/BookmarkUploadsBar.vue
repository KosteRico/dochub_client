<template>
    <div class="_loading">
        <PostWrapper :posts="posts"/>
        <b-loading :active.sync="loading" :can-cancel="false" :is-full-page="false"/>
    </div>
</template>

<script>
    import PostWrapper from "@/components/UploadsBar/PostWrapper"
    import loading from "@/mixins/loading";

    export default {
        name: "BookmarkUploadsBar",
        components: {PostWrapper},
        mixins: [loading],
        data () {
          return {
              posts: []
          }
        },
        metaInfo: {
            title: "Закладки"
        },
        methods: {
            loadPosts() {
                this.$http({url: `/bookmarks`})
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
            },
        },
        created() {
            this.loadPosts()
        }
    }
</script>

<style scoped>

</style>