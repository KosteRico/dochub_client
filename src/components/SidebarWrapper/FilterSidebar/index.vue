<template>
    <b-menu>
        <b-menu-list label="Теги">
            <li>
                <b-autocomplete
                        :data="filtered"
                        @input="searchTags"
                        @select="addTag"
                        placeholder="Тег"
                        v-model="tagsInput">
                    <template slot-scope="props">
                        <span>{{props.option.name}} ({{props.option.subscribers_count}} подписчиков)</span>
                    </template>
                    <template slot="empty">
                        Не найдено
                    </template>
                </b-autocomplete>
            </li>
            <li class="_tags" v-if="tags && tags.length > 0">
                <b-taglist>
                    <b-tag v-for="(t, i) in tags" @close="removeTag(i)" type="is-primary" :key="i" closable attached>{{t.name}}</b-tag>
                </b-taglist>
            </li>
        </b-menu-list>
    </b-menu>
</template>

<script>

    import searchTags from "@/mixins/searchTags";

    export default {
        components: {},
        mixins: [searchTags],
        data() {
            return {
                tagsInput: ""
            }
        },
        methods: {
            removeTag(index) {
                this.tags = this.tags.filter(function (value, i) {
                    return i !== index;
                })
            },
            addTag(tag) {
                const found = this.tags.findIndex((el) => {
                    return el.name === tag.name
                })

                if (found < 0) {
                    this.tags.push(tag)
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
._tags
    margin-top: 1rem

.menu-list
    margin-left: 0

.menu
    margin-right: 25px

</style>