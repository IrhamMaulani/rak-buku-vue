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

export default [{
        path: '/',
        component: UserHeader,
        children: [{
                path: "",
                component: Home
            },
            {
                path: "profile",
                component: Profile
            },
            {
                path: "reviews",
                component: Review
            },
            {
                path: "book",
                component: BookMenu
            },
            {
                path: "book",
                component: BookMenu
            },
            {
                path: "book/:id",
                component: BookItem
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