// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import Axios from 'axios'
// 本地配置变量
import Config from './config/base.js'
Vue.config.productionTip = false
Vue.use(iView)
Axios.defaults.baseURL = Config.login
Axios.defaults.timeout = 1000 * 15
Axios.defaults.headers['Content-Type'] = 'application/json'
Axios.defaults.withCredentials = true

Vue.prototype.$http = Axios
Vue.prototype.$config = Config
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
