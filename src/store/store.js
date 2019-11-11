import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'
import reputation from './modules/reputation'

Vue.use(Vuex);

export const store = new Vuex.Store({
    // strict: true,

    modules: {
        user,
        role,
        reputation
    }
})