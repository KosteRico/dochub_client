<template>
    <b-menu class="">
        <b-menu-list label="Навигация">
            <b-menu-item
                    active-class="is-active"
                    to="/home"
                    tag="router-link"
                    icon="home"
                    label="Домой"></b-menu-item>
            <b-menu-item
                    active-class="is-active"
                    to="/bookmarks"
                    tag="router-link"
                    icon="bookmark"
                    label="Закладки"></b-menu-item>
        </b-menu-list>
        <b-menu-list label="Подписки">
            <Tag v-for="tag in tags"
                 :key="tag.id"
                 :p-key="tag.id"
                 :text="tag.name"
                 @click-tag="clickTag"
            />
        </b-menu-list>
    </b-menu>
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
            this.$http({url: `/subscriptions/tags`, method: "GET"})
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
.menu-list
    margin-left: 0
.menu
    margin-right: 25px

</style>