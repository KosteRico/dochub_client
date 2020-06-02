<template>
    <div class="box">
        <div class="content">
            <div class="media">
                <div class="media-left">
                    <div class="_title-wrapper">
                        <h4 class="title is-4 is-size-5-mobile"><a @click="open">{{title}}</a></h4>
                        <a class="tag is-danger">pdf</a>
                    </div>
                    <!--                        <div class="tag is-danger">pdf</div>-->
                    <p class="subtitle _custom _custom-size is-size-7-mobile">
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
        <div class="content _description" v-if="description">
            <PostDescription :text="description"/>
        </div>
        <b-taglist>
            <router-link :to="`/tags/${i}`" class="tag is-light" v-for="i in tagNames" :key="i">{{i}}</router-link>
        </b-taglist>
        <b-modal :active="isModalActive">
            <PostModal :id="id"></PostModal>
        </b-modal>
    </div>
</template>

<script>
    import Date from "@/components/UploadsBar/PostWrapper/Post/Date";
    import PostDescription from "@/components/UploadsBar/PostWrapper/Post/PostDescription";
    import bookmark from "@/mixins/posts/bookmark";
    import PostModal from "@/components/PostModal";

    export default {
        components: {PostModal, PostDescription, Date},
        mixins: [bookmark],
        data() {
            return {
                isModalActive: false
            }
        },
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
                    parent: this.$root,
                    component: PostModal,
                    trapFocus: false,
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/mixins"

.media-left, .media-right
    flex-shrink: initial

.media-right
    @include mobile
        display: flex
        justify-content: flex-end
        flex-direction: column-reverse

._title-wrapper
    display: flex
    justify-content: flex-start
    flex-wrap: wrap

    .title
        margin-bottom: 0
        margin-right: .8rem

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