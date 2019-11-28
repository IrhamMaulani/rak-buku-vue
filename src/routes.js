import Modal from './components/Modal.vue'
import AdminUser from './components/admin/user/BreadUser.vue'
import AdminBook from './components/admin/book/BreadBook.vue'
import Home from './components/user/Home.vue'
import AdminHeader from "./components/AdminHeader.vue";
import UserHeader from "./components/UserHeader.vue";
import Profile from "./components/user/Profile.vue";
import Review from "./components/user/Review.vue";
import BookMenu from "./components/user/BookMenu.vue";
import BookItem from "./components/user/BookItem.vue";
import Login from "./components/auth/Login.vue";
import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: UserHeader,
            children: [{
                    path: "",
                    component: Home
                },
                {
                    path: "profile",
                    component: Profile,
                    meta: {
                        requiresAuth: true
                    }

                },
                {
                    path: "reviews",
                    component: Review
                },
                {
                    path: "reviews/:id",
                    component: Review
                },
                {
                    path: "book",
                    component: BookMenu
                },

                {
                    path: "book/:id",
                    component: BookItem
                },
                {
                    path: "book/:id/reviews",
                    component: Review
                },
                {
                    path: "login",
                    component: Login
                }
            ]
        },
        {
            path: '/coba',
            component: Modal
        },
        {
            path: '/admin',
            component: AdminHeader,
            children: [{
                    path: 'add-user',
                    component: AdminUser
                },
                {
                    path: 'add-book',
                    component: AdminBook
                }
            ]
        },

    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router