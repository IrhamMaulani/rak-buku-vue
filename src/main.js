import Vue from 'vue'
import App from './App.vue'
import {
  store
} from './store/store';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css';
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

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.filter('snippet', function (value, slice) {
  return value.slice(0, slice) + '...';
})

new Vue({
  store,
  render: function (h) {
    return h(App)
  },
  router: Routes,
  vuetify: vuetify
}).$mount('#app')