import axios from "axios";
import { async } from "q";

export default {
  state: {
    roles: [],
    role: {}
  },
  getters: {
    roles: state => {
      return state.roles;
    },
    role: state => {
      return state.role;
    }
  },
  mutations: {
    setRoles: (state, payload) => {
      state.roles = payload;
    },
    setRole: (state, payload) => {
      let role = state.roles.filter(role => {
        return role.id == payload;
      });

      state.role = role;
    },
    addRoles: (state, payload) => {
      state.roles.push(payload);
    }
  },
  actions: {
    getRoles: async (context, payload) => {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API}admin/role`);
        context.commit("setRoles", data.data);
      } catch (error) {}
    },
    addRoles: async (context, payload) => {}
  }
};
