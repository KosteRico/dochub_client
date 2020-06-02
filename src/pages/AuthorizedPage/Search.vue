<template>
    <div>
        <div v-if="!posts || posts.length === 0">
            <p>Документы не найдены</p>
        </div>
        <div v-else class="_loading">
            <p class="_res-title">Найдено: <strong>{{posts.length}}</strong></p>
            <PostWrapper :key="this.$route.fullPath" :posts="posts"/>
            <b-loading :active.sync="loading" :can-cancel="false" :is-full-page="false"/>
        </div>
    </div>
</template>

<script>
    import PostWrapper from "@/components/UploadsBar/PostWrapper"
    import loading from "@/mixins/loading";

    export default {
        name: "Search",
        components: {PostWrapper},
        mixins: [loading],
        data() {
            return {
                posts: []
            }
        },
        created() {
            this.$http({
                url: '/search',
                params: {
                    q: this.$route.query.q
                },
                method: "GET"
            }).then((resp) => {
                const ids = resp.data.ids
                var stop = false

                for (let i = 0; i < ids.length && !stop; i++) {
                    this.$http.get(`/posts/${ids[i]}`)
                        .then((resp1) => {
                            this.posts.push(resp1.data.post)
                        }).catch((err) => {
                        this.$toast({
                            message: err.response.data.message,
                            type: "is-danger"
                        })
                        stop = true
                    })
                }
            })
        }
    }
</script>

<style lang="sass" scoped>

._res-title
    margin-bottom: 1rem

</style>