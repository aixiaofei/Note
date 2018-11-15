// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "@/vuex/store";
import axios from 'axios'
import globalData from '@/components/commons/global'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = globalData
Vue.use(ElementUI);
axios.defaults.baseURL = globalData.BASE_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
