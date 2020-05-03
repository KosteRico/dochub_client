<template>
    <div>
        <div v-if="posts && posts.length > 0">
            <Post v-for="(p, i) in posts"
                  :key="i"
                  :id="p.id"
                  :title="p.title"
                  :initial-is-bookmarked="p.is_bookmarked"
                  :initial-bookmark-count="p.bookmark_count"
                  :description="p.description"
                  :tag-names="p.tag_names"
                  :date="p.date_created"
            />
        </div>
        <div v-else>
            <div class="content">
                <h4 class="title is-4 is-5-mobile">Документы отсутствуют</h4>
            </div>
        </div>
    </div>
</template>

<script>
    import Post from "./Post"

    export default {
        components: {Post},
        props: {
            posts: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>