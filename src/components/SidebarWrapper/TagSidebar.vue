<template>
    <div class="sidebar-item">
        <Tag
                v-for="tag in tags"
                :key="tag.id"
                :p-key="tag.id"
                :text="tag.name"
                @click-tag="clickTag"
        />
    </div>
</template>

<script>
    import Tag from "@/components/SidebarWrapper/Tag";

    export default {
        name: "TagSidebar",
        components: {Tag},
        data() {
            return {
                tags: []
            }
        },
        methods: {
            clickTag(id) {
                this.$emit('click-tag', id)
            }
        },
        created() {
            this.$http({url: `/users/${this.$store.getters.getUsername}/subscriptions/tags`, method: "GET"})
                .then(resp => {
                    const tags_ = resp.data.tags
                    console.log(resp.data.tags)

                    for (let i = 0; i < tags_.length; i++) {
                        console.log(tags_[i])
                        this.tags.push({
                            id: this.$uuid(),
                            name: tags_[i]
                        })
                    }

                }).catch(err => {
                console.log(`Subscribed tags init error: ${err}`)
            })
        }
    }
</script>

<style lang="sass" scoped>
    .sidebar-item
        padding-top: 27px
</style>