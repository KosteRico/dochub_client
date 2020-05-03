<template>
    <div class="box has-background-white-bis">
        <div class="media">
            <div class="media-content">
                <h3 class="title is-3">{{name}}</h3>
                <h6 class="subtitle is-6">1 млн. подписчиков</h6>
            </div>
            <div class="media-right">
                <b-button
                        :type="getType"
                        @click="$emit('click-follow')"
                        rounded
                >
                    {{followedMessage}}
                </b-button>
            </div>
        </div>
        <div class="content">
            Lorem ipsum do lor sit amet, consectetur adipisicing elit. Ab aliquam aspernatur esse eum facilis ipsum
            itaque molestiae, natus nemo nesciunt numquam possimus praesentium quo quod recusandae reiciendis
            reprehenderit, similique sint.
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
            getType() {
                return (this.isFollowed) ? 'is-light' : 'is-follow'
            }
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
.box
    border-radius: 0
.media
    margin-bottom: 1em

</style>