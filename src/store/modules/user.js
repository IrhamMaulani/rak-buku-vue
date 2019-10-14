import axios from "axios";

export default {
    state: {
        users: [],
        user: []
    },
    getters: {
        users: state => {
            return state.users;
        },
        user: state => {
            return state.user;
        }
    },
    mutations: {
        setUsers: (state, payload) => {
            state.users = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        },
        addUsers: (state, payload) => {
            state.users.push(payload);
        }
    },
    actions: {
        getUsers: async (context, payload) => {
            try {
                let {
                    data
                } = await axios.get(`${process.env.VUE_APP_API}admin/user`);
                context.commit("setUsers", data);
            } catch (error) {

            }

        }
    }
};