<template>
    <div>
        <TheNavigationBar/>
        <div class="container">
            <div class="columns">
                <div class="column is-full-mobile is-one-quarter-tablet is-2-desktop" v-if="!isTablet">
                    <TagSidebar :key="sidebarTagKey"/>
                </div>
                <div class="column is-two-fifths-widescreen is-three-fifths">
                    <router-view
                            @update-tags="sidebarTagKey++"
                            :key="this.$route.fullPath"/>
                </div>
            </div>
        </div>
        <footer class="footer"></footer>
    </div>
</template>

<script>
    import TheNavigationBar from "@/components/TheNavigationBar";
    import TagSidebar from "@/components/SidebarWrapper/TagSidebar";

    export default {
        components: {TagSidebar, TheNavigationBar},
        metaInfo: {
            title: "Home",
            titleTemplate: "%s | Dochub"
        },
        created() {
            console.log(screen.width)
            this.isTablet = screen.width <= 768
        },
        data() {
            return {
                sidebarTagKey: 1,
                isTablet: false,
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

.columns
    margin: 0

.container
    margin-top: 20px

</style>