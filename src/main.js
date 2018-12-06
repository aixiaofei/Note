// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "@/vuex/store";
import axios from 'axios'
import globalData from '@/components/global/global'
import '@/assets/css/color.css'
import connection from '@/components/connection/connection'
import processMessage from '@/components/connection/processMessage'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import http from '@/components/global/axios'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = globalData
Vue.prototype.$http = http
Vue.use(ElementUI);
Vue.use(iView);
axios.defaults.baseURL = globalData.BASE_URL
let strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
Vue.use(connection, {
  processMessage: processMessage
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
