// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// iview组件
import iView from 'iview'
// element组件
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// 使用 iview CSS
import 'iview/dist/styles/iview.css'
// ajax请求
import Axios from 'axios'
// 本地配置变量
import Config from './config/base.js'
// 本地存储localstory
import Lockr from 'lockr'
// 粒子效果
import VueParticles from 'vue-particles'
Vue.config.productionTip = false
// vue上使用iview
Vue.use(iView)
Vue.use(Element)
Vue.use(VueParticles)
Axios.defaults.baseURL = Config.login
Axios.defaults.timeout = 1000 * 15
Axios.defaults.headers['Content-Type'] = 'application/json'
Axios.defaults.withCredentials = true

// 引用axios到vue上
Vue.prototype.$http = Axios
// 引用base.js的常量到vue上
Vue.prototype.$config = Config
// 使用本地存储localstory
Vue.prototype.$lockr = Lockr
// 将路由
window.router = router
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
