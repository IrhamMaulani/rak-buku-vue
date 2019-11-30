export default {
    state: {
        status: false,
    },
    getters: {
        status: state => state.status
    },
    mutations: {
        setStatus(state, status) {
            state.status = status;
        },
    },
    actions: {
        setStatus(context, payload) {
            context.commit('setStatus', payload)
        }
    }
};