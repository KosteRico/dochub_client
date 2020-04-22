<template>
    <div>
        <TheNavigationBar/>
        <div class="main container">
            <div class="content">
                <div class="sidebar-wrapper">
                    <div class="sidebar">
                        <FilterSidebar/>
                    </div>
                </div>
            <HomeUploadsBar/>
            </div>
        </div>
    </div>
</template>

<script>
    import TheNavigationBar from "@/components/TheNavigationBar";
    import FilterSidebar from "@/components/SidebarWrapper/FilterSidebar"
    import HomeUploadsBar from "@/pages/AuthorizedPage/HomeUploadsBar";

    export default {
        name: "Search",
        components: {HomeUploadsBar, TheNavigationBar, FilterSidebar}
    }
</script>

<style scoped>

</style>