import Vue from 'vue';
import store from '@/store'
import VueRouter from "vue-router";
import HomeUploadsBar from "@/pages/AuthorizedPage/HomeUploadsBar";
import Home from "@/pages/AuthorizedPage/Home"
import TagUploadsBar from "@/pages/AuthorizedPage/TagUploadsBar";
import Search from "@/pages/AuthorizedPage/Search";
import SigninPage from "@/pages/SigninPage";
import RegisterPage from "@/pages/RegisterPage";

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: Home,
            children: [
                {
                    path: "",
                    component: HomeUploadsBar
                },
                {
                    path: "tags/:id",
                    component: TagUploadsBar
                }
            ],
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/search",
            component: Search,
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