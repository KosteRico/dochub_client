<template>
    <span>
        <span>{{text}} </span>
        <a v-on:click="isHidden = !isHidden" v-if="!isShort">{{linkText}}</a>
    </span>
</template>

<script>
    export default {
        name: "PostDescription",
        data() {
            return {
                isHidden: true,
                isShort: false,
                hasLongWord: false,
                maxWordLength: 10,
                maxLength: 60
            }
        },
        props:{
            text: {
                type: String,
                required: true
            }
        },
        created() {
            console.log(this.text)
            const wordsCount = this.text.split(' ').length

            this.isShort = this.text.length < this.maxLength || wordsCount < this.maxWordLength
            this.isHidden = !this.isShort
        },
        computed: {
            linkText() {
                return (this.isHidden ? "show" : "hide")
            },
            shortedText() {
                if (this.isShort) {
                    return this.text
                }
                return (this.isHidden) ? this.text.substring(0, this.maxWordLength) + "..." : this.text
            }
        }
    }
</script>

<style lang="sass" scoped>

a
    font-size: .9em
    color: rgba(34, 34, 34, 0.7)

    &:hover
        color: rgba(34, 34, 34, 0.7)
        text-decoration: underline

</style>