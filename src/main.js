import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import FastClick from 'fastclick'

import './plugins/element.js'
import './assets/base.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'mavon-editor/dist/css/index.css'



FastClick.attach(document.body)
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://139.155.49.173:3000'


Vue.filter('dateFormat', function (val) {
	val = parseInt(val)
  const date = new Date(val)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, '0')
  const d = (date.getDate() + '').padStart(2, '0')
  const hh = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')
  return `${y}/${m}/${d}    ${hh}:${mm}:${ss}`
  // return `${y}/${m}/${d}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
