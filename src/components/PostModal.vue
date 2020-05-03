<template>
    <div class="box _loading">
        <div class="media">
            <div class="media-left">
                <h4 class="title is-4 is-size-5-mobile is-capitalized"><a>{{title}}</a></h4>
                <p class="subtitle _custom-size is-size-7-mobile">
                    <Date :date-str="date"/>
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

    </div>
</template>

<script>
    import bookmark from "@/mixins/posts/bookmark";
    import Date from "@/components/UploadsBar/PostWrapper/Post/Date";

    export default {
        name: "PostModal",
        components: {Date},
        mixins: [bookmark],
        props: ['id'],
        data() {
            return {
                description: String,
                title: String,
                date: String,
                tagNames: Array
            }
        },
        created() {
            this.$http.get(`/posts/${this.id}`)
                .then(resp => {
                    this.description = resp.data.post.description
                    this.title = resp.data.post.title
                    this.date = resp.data.post.date_created
                    this.bookmarkCount = resp.data.post.bookmark_count
                })
        }
    }
</script>

<style lang="sass" scoped>
.subtitle._custom-size
    font-size: 0.85rem

</style>