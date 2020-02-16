import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

import axios from '@/api'

import plugin from '@/plugin'
Vue.use(plugin)

Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router

}).$mount('#app')
