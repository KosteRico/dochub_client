<template>
    <div class="description" ref="d_block"><span class="d-title">Описание: </span>
        <span class="text" ref="text" v-bind:class="{'word-break-all' : hasLongWord}">{{shortedText}} </span>
        <a v-on:click="isHidden = !isHidden" v-if="!isShort">{{linkText}}</a></div>
</template>

<script>
    export default {
        name: "PostDescription",
        data() {
            return {
                isHidden: true,
                isShort: false,
                hasLongWord: false,
                maxWordLength: 30,
                maxLength: 40
            }
        },
        props: [
            'text'
        ],
        mounted() {
            console.log(this.text.length)
            const splitted = this.text.split(' ')

            for (let i = 0; i < splitted.length; i++) {
                if (splitted[i].length >= this.maxWordLength) {
                    this.hasLongWord = true
                    return
                }
            }

            this.isShort = this.text.length <= this.maxLength;
        },
        computed: {
            linkText() {
                return (this.isHidden ? "show" : "hide")
            },
            shortedText() {
                if (this.isShort) {
                    return this.text
                }
                return (this.isHidden) ? this.text.substring(0, this.maxLength) + "..." : this.text
            }
        }
    }
</script>

<style lang="sass" scoped>

.word-break-all
    word-break: break-all

.description
    overflow: hidden

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