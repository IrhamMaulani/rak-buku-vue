import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,

    modules: {
        user: user
    }
})