import axios from "axios";

export default {
    state: {
        reputations: [],
        reputation: {}
    },
    getters: {
        reputations: state => {
            return state.reputations;
        },
        reputation: state => {
            return state.reputation;
        }
    },
    mutations: {
        setReputations: (state, payload) => {
            state.reputations = payload;
        },
        setReputation: (state, payload) => {
            let reputation = state.reputations.filter(role => {
                return reputation.id == payload;
            });

            state.reputation = reputation;
        },
        addReputations: (state, payload) => {
            state.reputations.push(payload);
        }
    },
    actions: {
        getReputations: async (context, payload) => {
            try {
                let {
                    data
                } = await axios.get(`${process.env.VUE_APP_API}admin/reputation`);
                context.commit("setReputations", data.data);
            } catch (error) {}

        }
    }
};