import ImageInput from './components/ImageInput.vue'
import AdminUser from './components/admin/user/BreadUser.vue'
import AdminBook from './components/admin/book/BreadBook.vue'
import Home from './components/user/Home.vue'
import AdminHeader from "./components/AdminHeader.vue";
import UserHeader from "./components/UserHeader.vue";
import Profile from "./components/user/Profile.vue";
import Review from "./components/user/Review.vue";
import BookMenu from "./components/user/BookMenu.vue";
import BookItem from "./components/user/BookItem.vue";
import AddBook from "./components/user/AddBook.vue";
import AddPublisher from "./components/user/AddPublisher.vue";
import AddAuthor from "./components/user/AddAuthor.vue";
import Setting from "./components/user/Setting.vue";
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
                    path: "profile/",
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
                    path: "add-book",
                    component: AddBook,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: "add-author",
                    component: AddAuthor,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: "add-publisher",
                    component: AddPublisher,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: "book/:id/reviews",
                    component: Review
                },
                {
                    path: "login",
                    component: Login,
                    meta: {
                        login: true
                    }
                },
                {
                    path: "setting",
                    component: Setting,
                    meta: {
                        requiresAuth: true
                    }

                },

            ]
        },
        {
            path: '/coba',
            component: ImageInput
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
    if (to.matched.some(record => record.meta.login)) {

        if (!store.getters.isLoggedIn) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

export default router