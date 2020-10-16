import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './index.js'
import $axios from './axios'
import './assets/base.css';
import store from './store'
Vue.prototype.axios=$axios
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),router,store
}).$mount('#app')
