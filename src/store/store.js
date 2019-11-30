import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'
import reputation from './modules/reputation'
import book from './modules/book'
import login from './modules/login'
import status from './modules/status'

Vue.use(Vuex);

export default new Vuex.Store({
    // strict: true,

    modules: {
        user,
        role,
        reputation,
        book,
        login,
        status
    }
})