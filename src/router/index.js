import Vue from 'vue';
import store from '@/store'
import VueRouter from "vue-router";
import HomeUploadsBar from "@/pages/AuthorizedPage/HomeUploadsBar";
import Home from "@/pages/AuthorizedPage/Home"
import TagUploadsBar from "@/pages/AuthorizedPage/TagUploadsBar";
import Search from "@/pages/AuthorizedPage/Search";
import SigninPage from "@/pages/SigninPage";
import RegisterPage from "@/pages/RegisterPage";
import BookmarkUploadsBar from "@/pages/AuthorizedPage/BookmarkUploadsBar";
import PostPage from "@/pages/AuthorizedPage/PostPage";
import TagSidebar from "@/components/SidebarWrapper/TagSidebar";
import FilterSidebar from "@/components/SidebarWrapper/FilterSidebar"

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", redirect: "/home"},
        {
            path: "/",
            component: Home,
            children: [
                {
                    path: "home",
                    components: {
                        default: HomeUploadsBar,
                        sidebar: TagSidebar
                    },
                },
                {
                    path: "tags/:id",
                    components: {
                        default: TagUploadsBar,
                        sidebar: TagSidebar,
                    },
                },
                {
                    path: "bookmarks",
                    components: {
                        default: BookmarkUploadsBar,
                        sidebar: TagSidebar
                    },
                },
                {
                    path: "d/:id",
                    components: {
                        default: PostPage,
                        sidebar: TagSidebar,
                    },
                    props: true
                },
                {
                    path: "search",
                    components: {
                        default: Search,
                        sidebar: FilterSidebar,
                    },
                    name: 'search',
                    props: (route) => (
                        {q: route.query.q}
                    ),

                }
            ],
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            component: SigninPage
        },
        {
            path: "/register",
            component: RegisterPage
        },
        {path: '*', redirect: '/404'},
        {
            path: '/404', component: {
                template: "<h1>Not found</h1>"
            }
        }
    ]
})

router.beforeEach((to, from, next) => {

    console.log('Before each: ' + to.matched.some(record => record.meta.requiresAuth));
    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (store.getters.isLoggedIn) {

            console.log('Before each and logged in: ' + to.matched.some(record => record.meta.requiresAuth));
            next()

            return
        }
        console.log('Before each and not in: ' + to.matched.some(record => record.meta.requiresAuth));
        next('/login')
    } else {
        next()
    }
})

export default router