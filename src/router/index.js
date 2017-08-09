import Vue from 'vue'
import Router from 'vue-router'
// 登录vue
import Login from '@/components/login/login.vue'
// 首页vue
import Index from '@/components/index/index.vue'
// 用户
import User from '@/components/user/user.vue'
// 404页面
import NotFound from '@/components/notfound/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      history: true,
      // 前台html根据name进行路由跳转
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      history: true,
      component: NotFound
    },
    {
      path: '/index',
      history: true,
      component: Index,
      name: 'index',
      children: [
        {path: 'user', component: User, name: 'user'}
      ]
    }
  ]
})
