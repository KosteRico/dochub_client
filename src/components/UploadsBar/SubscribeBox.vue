<template>
    <div class="page-box primary top-box tag-title-box">
        <div class="top-wrapper">
            <div class="title">{{name}}</div>
            <div class="under-title">1 млн. подписчиков</div>
        </div>
        <div class="bottom-wrapper">
            <button
                    @click="$emit('click-follow')"
                    type="button"
                    :class="{followed: isFollowed}">
                {{followedMessage}}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SubscribeBox",
        computed: {
            followedMessage() {
                return (this.isFollowed) ? 'вы подписаны' : 'подписаться'
            },

        },
        props: {
            isFollowed: {
                type: Boolean,
                required: true,
            },
            name: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="sass" scoped>
.top-box
    border-radius: 0
    font-size: 1.1em
    padding: 5px 1em
    display: flex

    .top-wrapper
        flex-grow: 2

    .bottom-wrapper
        width: fit-content
        flex-grow: 1
        display: flex
        justify-content: flex-end
        align-items: center

    button
        font-weight: normal
        padding: 0 15px
        font-size: 1em
        background-color: #db0000
        border: 1px solid #b90000
        color: white
        border-radius: 8px
        outline: none
        /*height: fit-content*/

        &.followed
            font-size: calc(100% - 6px)
            color: black
            background-color: #E5E5E5
            border: 1px solid #dddddd

</style>