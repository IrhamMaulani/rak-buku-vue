import axios from "axios";

export default {
    state: {
        status: '',
        user: {},
        token: localStorage.getItem('token') || ''
    },
    getters: {
        isLoggedIn: state => {
            return !!state.token
        },
        authStatus: state => {
            return state.status
        },
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },

    },
    actions: {
        login({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({
                        url: `${process.env.VUE_APP_API}book`,
                        data: user,
                        method: 'POST'
                    })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        }
    }
};