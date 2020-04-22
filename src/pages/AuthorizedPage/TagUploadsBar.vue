<template>
    <div class="uploads middle-width">
        <SubscribeBox @click-follow="clickFollow" :is-followed="isFollowed" :name="tagName"/>
        <PostWrapper :posts="posts"/>
    </div>
</template>

<script>
    import PostWrapper from "@/components/UploadsBar/PostWrapper";
    import SubscribeBox from "@/components/UploadsBar/SubscribeBox";

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
                tagName: this.$route.params.id
            }
        },
        methods: {
            forceRender() {
                this.componentKey = this.$uuid()
            },
            clickFollow() {
                this.$http({
                    url: `/users/${this.$store.getters.getUsername}/subscriptions/tags`, params: {
                        name: this.tagName,
                        status: !this.isFollowed
                    }, method: "POST"
                }).then((resp) => {
                    this.isFollowed = !this.isFollowed
                    this.$store.commit("startAlert", {
                        message: resp.data.message,
                        variant: "success"
                    })
                }).catch(err => {
                    this.$store.commit("startAlert", {
                        message: err.response.data.message,
                        variant: "danger"
                    })
                })
            },
            loadData() {
                this.$http({
                    url: `/users/${this.$store.getters.getUsername}/tags`,
                    params: {name: this.tagName},
                    method: "GET"
                })
                    .then(resp => {
                        this.tagName = resp.data.tag.name
                        const _posts = resp.data.tag.posts
                        this.isFollowed = resp.data.tag.subscribed

                        for (let i = 0; i < _posts.length; i++) {
                            this.posts.push(_posts[i])
                        }
                    })
            }
        },
        created() {
            console.log("created")
            this.loadData()
        },
        updated() {
            console.log("updated")
        },
        destroyed() {
            console.log("destroyed")
        }
    }
</script>

<style scoped>

</style>