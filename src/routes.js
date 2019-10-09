import Modal from './components/Modal.vue'
import AdminUser from './components/admin/user/BreadUser.vue'
import AdminBook from './components/admin/book/BreadBook.vue'

export default [

    {
        path: '/coba',
        component: Modal
    },
    {
        path: '/admin/add-user',
        component: AdminUser
    },
    {
        path: '/admin/add-book',
        component: AdminBook
    },
]