<template>
    <div class="description"><span class="d-title">Описание: </span>
        <span v-if="!isHidden" class="text">{{text}} </span>
        <a v-on:click="isHidden = !isHidden" :class="{hidden: !isHidden}">{{linkText}}</a></div>
</template>

<script>
    export default {
        name: "PostDescription",
        data() {
            return {
                isHidden: true,
                text: "Lorem ipsum dolor sit amet, consectetur" +
                    " adipisicing elit. Culpa dicta dolorum eaque exercitationem ipsam" +
                    " itaque magnam nemo optio placeat quaerat recusandae rerum sint, voluptate" +
                    " voluptates voluptatum. Ipsa quam quas voluptates."
            }
        },
        computed: {
            linkText() {
                return "(" + (this.isHidden ? "show" : "hide") + ")"
            }
        }
    }
</script>

<style lang="sass" scoped>
    .d-title
        font-weight: bold
        font-size: 1.08em

        a
            font-size: .9em
            color: rgba(34, 34, 34, 0.7)

            &:hover
                color: rgba(34, 34, 34, 0.7)
                text-decoration: underline

</style>