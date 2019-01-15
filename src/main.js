// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/vuex/store'
import '@/assets/css/color.css'
import connection from '@/components/connection/connection'
import processMessage from '@/components/connection/processMessage'
import { Spin } from 'iview'
import 'iview/dist/styles/iview.css'
import { VAvatar } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('Spin', Spin)
Vue.component('v-avatar', VAvatar)
const strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
Vue.use(connection, {
  processMessage: processMessage
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})
