<template>
    <div class="box">
        <div class="content">
            <div class="media">
                <div class="media-left">
                    <h4 class="title is-4 is-size-5-mobile is-capitalized"><a @click="open">{{title}}</a></h4>
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
        <div class="content _description">
            <PostDescription :text="description"/>
        </div>
        <b-taglist>
            <router-link :to="`/tags/${i}`" class="tag is-light" v-for="i in tagNames" :key="i">{{i}}</router-link>
        </b-taglist>
    </div>
</template>

<script>
    import Date from "@/components/UploadsBar/PostWrapper/Post/Date";
    import PostDescription from "@/components/UploadsBar/PostWrapper/Post/PostDescription";
    import PostModal from "@/components/PostModal";
    import bookmark from "@/mixins/posts/bookmark";

    export default {
        components: {PostDescription, Date},
        mixins: [bookmark],
        props: [
            'id',
            'title',
            'date',
            'description',
            'initialBookmarkCount',
            'tagNames',
            'initialIsBookmarked',
            'type'
        ],
        created() {
            this.bookmarkCount = this.initialBookmarkCount
            this.isBookmarked = this.initialIsBookmarked
        },
        methods: {
            open() {
                let props = {
                    id: this.id
                };
                this.$buefy.modal.open({
                    props,
                    parent: this,
                    component: PostModal,
                    trapFocus: true,
                    canCancel: ['x', 'outside']
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/mixins"

.subtitle._custom-size
    font-size: 0.85rem

._description
    word-break: break-all
    word-break: break-word

._description._custom-size
    @include mobile
        font-size: 0.9em

.title a
    color: inherit

    &:hover
        text-decoration: underline

.box
    border-radius: 15px
</style>