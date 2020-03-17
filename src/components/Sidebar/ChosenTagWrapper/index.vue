<template>
    <div class="chosen-tags-wrapper">
        <ChosenTag
                v-for="item in tags"
                :key="item.id"
                :id="item.id"
                :name="item.name"
                @remove-item="removeItem"
        />
    </div>
</template>

<script>
    import ChosenTag from "@/components/Sidebar/ChosenTagWrapper/ChosenTag";

    export default {
        components: {ChosenTag},
        methods: {
            removeItem(id) {
                this.tags = this.tags.filter(t => t.id !== id)
            }
        },
        data() {
            return {
                tags: [
                    {id: 1, name: 'Тэг1'},
                    {id: 2, name: 'Тэг2'},
                    {id: 3, name: 'Тэг12'},
                    {id: 4, name: 'Тэг123'},
                    {id: 5, name: 'Тэг1234'},
                    {id: 6, name: 'Тэг1112'},
                ]
            }
        }
    }
</script>

<style lang="sass" scoped>
    .chosen-tags-wrapper
        color: black
</style>