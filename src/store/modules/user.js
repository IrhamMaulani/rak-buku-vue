import axios from "axios";

export default {
    state: {
        users: [],
        user: {}
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
            const user = state.users.filter(user => {
                return user.id == payload;
            });

            state.user = user;
        },
        addUsers: (state, payload) => {

            state.users.push(payload);
        }
    },
    actions: {
        getUsers: async (context, payload) => {
            try {
                const {
                    data
                } = await axios.get(`${process.env.VUE_APP_API}admin/user`);
                context.commit("setUsers", data.data);
            } catch (error) {}
        },
        addUsers: async (context, payload) => {
            const data = await axios.post(`${process.env.VUE_APP_API}admin/user`, payload)
            context.commit("addUsers", payload);

        }
    }
};