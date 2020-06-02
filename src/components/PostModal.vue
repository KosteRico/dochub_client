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
                <b-button ref="d_button" tag="a" @click="download" type="is-primary" icon-pack="fas" icon-left="file">Скачать файл</b-button>
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
        <div class="content _description" v-if="description">
            <PostDescription :text="description"/>
        </div>
        <b-taglist>
            <a class="tag is-light" @click="toTag(i)" v-for="i in tagNames" :key="i">{{i}}</a>
        </b-taglist>
        <div class="buttons">
        </div>
    </div>
</template>

<script>
    import CyrillicToTranslit from 'cyrillic-to-translit-js'
    import bookmark from "@/mixins/posts/bookmark";
    import Date from "@/components/UploadsBar/PostWrapper/Post/Date";
    import PostDescription from "@/components/UploadsBar/PostWrapper/Post/PostDescription";
    import closeModal from "@/mixins/closeModal";
    import mime from 'mime-types'

    export default {
        name: "PostModal",
        components: {PostDescription, Date},
        data() {
            return {
                description: null,
                title: null,
                date: null,
                tagNames: null,
            }
        },
        mixins: [bookmark, closeModal],
        props: ['id'],
        created() {
            this.$http.get(`/posts/${this.id}`)
                .then(resp => {
                    this.description = resp.data.post.description
                    this.title = resp.data.post.title
                    this.date = resp.data.post.date_created
                    this.bookmarkCount = resp.data.post.bookmark_count
                    this.tagNames = resp.data.post.tag_names
                    this.isBookmarked = resp.data.post.is_bookmarked
                })
        },
        methods: {
            toTag(t) {
                this.close()
                this.$router.push(`/tags/${t}`)
            },
            download() {
                this.$http({
                    url: `/posts/${this.id}/file`,
                    method: 'GET',
                    responseType: 'blob'
                }).then(resp => {
                    console.log(resp.headers)
                    const type = resp.headers['content-type']
                    const url = window.URL.createObjectURL(new Blob([resp.data], {type}))
                    const link = document.createElement('a')
                    let name = this.title.replace(/[.,/#!$%&;:{}=\-_`~()]/g,"")
                    name = CyrillicToTranslit().transform(name, '_')

                    const ext = mime.extension(type)

                    console.log(name)
                    link.href = url
                    link.setAttribute('download', `${name}.${ext}`)
                    document.body.appendChild(link)
                    link.click()
                    link.href = ''
                    link.removeAttribute('download')
                })
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/mixins"

.subtitle._custom-size
    font-size: 0.85rem

._description._custom-size
    @include mobile
        font-size: 0.9em


</style>