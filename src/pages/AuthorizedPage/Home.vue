<template>
    <div>
        <NewNavbar/>
        <div class="main container">
            <div class="content">
                <div class="sidebar-wrapper">
                    <div class="sidebar">
                        <TagSidebar @click-tag="handleTagClick"/>
                    </div>
                </div>
                <router-view :key="this.$route.fullPath"/>
            </div>
        </div>
    </div>
</template>

<script>
    // import TheNavigationBar from "@/components/TheNavigationBar";
    import TagSidebar from "@/components/SidebarWrapper/TagSidebar";
    import {v4 as uuid} from 'uuid'
    import NewNavbar from "@/components/NewNavbar";

    export default {
        components: {NewNavbar, TagSidebar},
        created() {
            this.uploadBarId = uuid()
        },
        data() {
            return {
                uploadBarId: null
            }
        },
        methods: {
            handleTagClick(id) {
                console.log(id)
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/variables"

    .sidebar-wrapper
        font-size: 1.1em
        width: $side-width
        margin-right: 1em
        border: none
        // display: inline-box

        .sidebar
            position: fixed
            width: inherit
            padding-right: 2em
</style>