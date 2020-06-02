<template>
    <div class="box _loading">
        <div class="media">
            <div class="media-left">
                <h4 class="title is-4 is-size-5-mobile is-capitalized">{{title}}</h4>
                <p class="subtitle _custom-size is-size-7-mobile">
                    <Date v-if="date" :date-str="date"/>
                </p>
            </div>
            <div class="media-content"></div>
            <div class="media-right">
                <b-button
                        tag="a"
                        :class="isBookmarked ? 'has-text-primary' : ''"
                        type="is-text"
                        icon-right="bookmark"
                        @click="bookmarkPost"
                >{{bookmarkCount}}
                </b-button>
                <b-button
                        type="is-text"
                        tag="a"
                        icon-right="dots-vertical"
                ></b-button>
            </div>
        </div>
        <div class="content _description">
            <PostDescription v-if="description" :text="description"/>
        </div>
        <b-taglist>
            <router-link :to="`/tags/${i}`" class="tag is-light" v-for="i in tagNames" :key="i">{{i}}</router-link>
        </b-taglist>
    </div>

</template>

<script>
    import PostDescription from "@/components/UploadsBar/PostWrapper/Post/PostDescription";
    import Date from "@/components/UploadsBar/PostWrapper/Post/Date";
    import bookmark from "@/mixins/posts/bookmark";

    export default {
        name: "PostPage",
        components: {PostDescription, Date},
        data() {
            return {
                title: null,
                description: null,
                date: null,
                tagNames: null,
            }
        },
        mixins: [bookmark],
        props: ['id'],
        created() {
            console.log('PostPage Created')
            console.log(this.description === null)
            this.$http.get(`/posts/${this.id}`)
                .then(resp => {
                    console.log('Initialized')
                    this.description = resp.data.post.description
                    this.title = resp.data.post.title
                    this.date = resp.data.post.date_created
                    this.bookmarkCount = resp.data.post.bookmark_count
                    this.tagNames = resp.data.post.tag_names
                    this.isBookmarked = resp.data.post.is_bookmarked
                    console.log(this.description === null)
                }).catch(err => {
                console.log(err)
            })
        }

    }
</script>

<style scoped>

</style>