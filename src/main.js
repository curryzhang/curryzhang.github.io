// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import "babel-polyfill"

import './assets/js/commonjs.js';
import './assets/css/common.css';

/* Network plugin */


Vue.config.productionTip = false
Vue.use(ElementUI)

import PortalUI from '../packages';
Vue.use(PortalUI);

import axios from 'axios';
Vue.prototype.$http = Vue.http = axios;

import global_ from './Global.vue'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;
Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },

  template: '<App/>'
})
