import Modal from './components/Modal.vue'
import AdminUser from './components/admin/user/BreadUser.vue'
import AdminBook from './components/admin/book/BreadBook.vue'
import Home from './components/user/Home.vue'
import AdminHeader from "./components/AdminHeader.vue";
import UserHeader from "./components/UserHeader.vue";

export default [{
        path: '/',
        component: UserHeader,
        children: [{
            path: "",
            component: Home
        }]
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