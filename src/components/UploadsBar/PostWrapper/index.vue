<template>
    <div>
        <div class="post-wrapper">
            <Post v-for="p in posts"
                  :key="p.id"
                  :id="p.id"
                  :title="p.title"
                  :description="p.description"
                  :like-count="p.like_count"
                  :bookmark-count="p.bookmark_count"
                  :tag-names="p.tag_names"
                  :date="p.date_created"
            />
        </div>
    </div>
</template>

<script>
    import Post from "./Post"
    // import axios from 'axios'

    export default {
        components: {Post},
        data() {
            return {
                count: 20,
            }
        }, props: {
            posts: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>