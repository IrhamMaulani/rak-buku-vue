import ImageInput from './components/ImageInput.vue'
import AdminUser from './components/admin/user/BreadUser.vue'
import AdminBook from './components/admin/book/BreadBook.vue'
import AdminTag from './components/admin/tag/BreadTag.vue'
import AdminPublisher from './components/admin/publisher/BreadPublisher.vue'
import AdminAuthor from './components/admin/author/BreadAuthor.vue'
import AdminHome from './components/admin/home/Home.vue'
import Home from './components/user/Home.vue'
import AdminHeader from "./components/AdminHeader.vue";
import UserHeader from "./components/UserHeader.vue";
import Profile from "./components/user/Profile.vue";
import ReviewMenu from "./components/user/ReviewMenu.vue";
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
import NotFound from "./components/NotFound.vue";
import About from './components/user/About.vue'
import Career from './components/user/Career.vue'
import Term from './components/user/Term.vue'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '*',
            component: NotFound
        },
        {
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
                    component: ReviewMenu
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
                {
                    path: "about",
                    component: About
                },
                {
                    path: "career",
                    component: Career
                },

                {
                    path: "term",
                    component: Term
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
            meta: {
                admin: true
            },
            children: [{
                    path: 'add-user',
                    component: AdminUser
                },
                {
                    path: 'add-book',
                    component: AdminBook
                },
                {
                    path: 'add-tag',
                    component: AdminTag
                },
                {
                    path: 'add-publisher',
                    component: AdminPublisher
                },
                {
                    path: 'add-author',
                    component: AdminAuthor
                },
                {
                    path: 'home',
                    component: AdminHome
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
    if (to.matched.some(record => record.meta.admin)) {
        store.dispatch("checkAdmin").
        then(() => {
            if (store.getters.isAdmin) {
                next()
                return
            }
            next('/')
        })
    } else {
        next()
    }
})

export default router