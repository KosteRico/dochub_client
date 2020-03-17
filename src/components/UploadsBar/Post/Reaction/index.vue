<template>
    <a class="reaction link-animation-light" v-on:click="updateReaction">
        <Icon :image-file="currentIconFile"/>
        <span class="counter" :class="{bold: isChecked}">{{counter}}</span>
    </a>
</template>

<script>
    import Icon from "@/components/Icon";

    export default {
        props: {
            iconFiles: Object
        },
        methods: {
            updateReaction() {
                this.isChecked = !this.isChecked;
                this.counter += (this.isChecked ? 1 : -1)
            }
        },
        components: {Icon},
        data() {
            return {
                isChecked: false,
                counter: 0
            }
        },
        computed: {
            currentIconFile() {
                return (this.isChecked ? this.iconFiles.active : this.iconFiles.inactive)
            }
        }
    }
</script>

<style lang="sass" scoped>
    .reaction
        padding: 4px 10px
        border-radius: 15px
        cursor: pointer
        color: inherit
        display: flex
        flex-direction: row

        .counter
            margin-left: 8px
            align-self: center

            &.bold
                font-weight: bold
</style>