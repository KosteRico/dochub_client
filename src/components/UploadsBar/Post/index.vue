<template>
    <div class="page-box feed">
        <div class="top-wrapper">
            <div class="top-wrapper-inner">
                <div class="title">
                    <span class="title-inner">Lorem ipsum dolor sit</span><span
                        class="doc-format user-select-none">.pdf</span>
                </div>
                <Date/>
                <PostDescription/>
            </div>
            <DownloadDoc/>
        </div>
        <div class="tag-wrapper">
            <a class="tag" v-for="i in 10" :key="i">aaa</a>
        </div>
        <div class="feed-wrapper">
            <div class="tools-bar user-select-none top-line">
                <UpvoteReaction/>
                <BookmarkReaction/>
            </div>
        </div>
    </div>
</template>

<script>
    import UpvoteReaction from "@/components/UploadsBar/Post/Reaction/UpvoteReaction";
    import BookmarkReaction from "@/components/UploadsBar/Post/Reaction/BookmarkReaction";
    import PostDescription from "@/components/UploadsBar/Post/PostDescription";
    import DownloadDoc from "@/components/UploadsBar/Post/DownloadDoc";
    import Date from "@/components/UploadsBar/Post/Date";

    export default {
        components: {Date, DownloadDoc, PostDescription, BookmarkReaction, UpvoteReaction}
    }
</script>

<style lang="sass" scoped>
    .feed
        margin-bottom: 1.4em
        width: 100%
        padding: 1em

        .tag-wrapper
            justify-content: flex-start
            margin-bottom: -12px
            font-size: .88em
            display: flex
            flex-direction: row
            flex-wrap: wrap

        .doc-format
            margin-left: 10px
            font-size: .8em
            font-weight: normal
            padding: 2px 6px
            border-radius: 15px
            background: rgba(230, 230, 230, .8)

        .top-wrapper
            display: flex
            justify-content: space-between


        .feed-wrapper
            margin-top: 10px
            display: flex
            flex-direction: row
            justify-content: space-between

            .author
                font-size: .95em

                .name
                    cursor: pointer

        .reaction
            cursor: pointer
            color: inherit
            display: flex
            flex-direction: row

            .counter
                margin-left: 8px
                align-self: center

        .tools-bar
            padding-top: 5px
            width: 100%
            display: flex
            flex-direction: row
            margin-right: 0
            justify-content: space-between

</style>