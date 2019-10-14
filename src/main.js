import Vue from 'vue'
import App from './App.vue'
import {
  store
} from './store/store';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css';
import VueRouter from 'vue-router'
import Routes from './routes'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from "axios";


Vue.config.productionTip = false
Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#95BCDC',
        secondary: '#A3CEF1',
        accent: '#B3D6F3'
      }
    }
  }
})

Vue.prototype.$http = axios;
Vue.prototype.$baseUrl = process.env.VUE_APP_API;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

new Vue({
  store,
  render: function (h) {
    return h(App)
  },
  router: router,
  vuetify: vuetify
}).$mount('#app')