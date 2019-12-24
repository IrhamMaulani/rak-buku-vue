import axios from "axios";

export default {
    state: {
        isAdmin: false,


    },
    getters: {
        isAdmin: state => {

            return state.isAdmin;

        },
    },
    mutations: {
        checkAdmin(state, isAdmin) {
            state.isAdmin = isAdmin;

        },

    },
    actions: {
        checkAdmin({
            commit
        }) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                        url: `${process.env.VUE_APP_API}check-admin`,
                        method: "GET"
                    })
                    .then(resp => {
                        const isAdmin = resp.data.admin;

                        commit("checkAdmin",
                            isAdmin
                        );
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log(err);
                        // commit("auth_error", err.response.data.message);
                        reject(err);
                    });
            });
        }
    }
};