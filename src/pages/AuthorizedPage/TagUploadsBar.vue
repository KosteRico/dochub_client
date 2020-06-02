<template>
    <div class="_loading">
        <SubscribeBox @click-follow="clickFollow" :is-followed="isFollowed" :name="tagName"/>
        <PostWrapper :posts="posts"/>
        <b-loading :active.sync="loading" :can-cancel="false" :is-full-page="false"/>
    </div>
</template>

<script>
    import PostWrapper from "@/components/UploadsBar/PostWrapper"
    import SubscribeBox from "@/components/UploadsBar/SubscribeBox";
    import loading from "@/mixins/loading";

    export default {
        name: "TagUploadsBar",
        components: {
            SubscribeBox,
            PostWrapper
        },
        data() {
            return {
                componentKey: this.$uuid(),
                isFollowed: false,
                posts: [],
                tagName: ""
            }
        },
        metaInfo() {
            return {
                title: this.tagName,
            }
        },
        mixins: [loading],
        methods: {
            forceRender() {
                this.componentKey = this.$uuid()
            },
            clickFollow() {
                this.$http({
                    url: `/subscriptions/tags`, params: {
                        name: this.tagName,
                        status: !this.isFollowed
                    }, method: "POST"
                }).then((resp) => {
                    this.$toast({
                        message: resp.data.message,
                    })
                    this.isFollowed = !this.isFollowed
                    this.$emit('update-tags')
                }).catch(err => {
                    this.$toast({
                        message: err.response.data.message,
                        type: "is-danger"
                    })
                })
            },
            loadData() {
                this.$http.get(`/tags?name=${this.$route.params.id}`)
                    .then(resp => {
                        this.tagName = resp.data.tag.name
                        const _posts = resp.data.tag.posts
                        this.isFollowed = resp.data.tag.subscribed

                        for (let i = 0; i < _posts.length; i++) {
                            this.posts.push(_posts[i])
                            console.log('Is bookmarked? ' + _posts[i].is_bookmarked)
                        }
                    })
            }
        },
        created() {
            console.log("created")
            this.loadData()
        },
        destroyed() {
            console.log("destroyed")
        }
    }
</script>

<style lang="sass" scoped>

</style>