import axios from "axios";

export default {
    state: {
        status: "",
        userName: "",
        token: "",
        message: ""
    },
    getters: {
        isLoggedIn: state => {
            return !!window.$cookies.get("token") || !!state.token;
        },
        authStatus: state => {
            return state.status;
        },
        authMessage: state => {
            return state.message;
        },
        userName: state => {
            return window.$cookies.get("user_name") || state.userName;
        }
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, {
            token,
            user
        }) {
            state.status = "success";
            state.token = token;
            state.userName = user.user_name;
        },
        auth_error(state, message) {
            state.status = "error";
            state.message = message;
        },
        auth_failed(state) {
            state.status = "failed";
        },
        logout(state) {
            state.status = "";
            state.token = "";
            state.userName = "";
        }
    },
    actions: {
        login({
            commit
        }, user) {

            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                        url: `${process.env.VUE_APP_API}login`,
                        data: user,
                        method: "POST"
                    })
                    .then(resp => {
                        const token = `${resp.data.token_type} ${resp.data.access_token}`;
                        const user = resp.data.user;

                        window.$cookies
                            .set("user_name", user.user_name, "1y")
                            .set("token", token, "1y");

                        // Add the following line:
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("auth_success", {
                            token,
                            user
                        });
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log(err);

                        commit("auth_error", err.response.data.message);
                        window.$cookies.remove("token");
                        window.$cookies.remove("user_name");
                        reject(err);
                    });
            });
        },
        logout({
            commit
        }, user) {}
    }
};