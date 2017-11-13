import Vue from 'vue'
import Router from 'vue-router'
// 登录vue
import Login from '@/components/login/login.vue'
// 首页vue
import Index from '@/components/index/index.vue'
// 用户
import Admin from '@/components/admin/user.vue'
// 404页面
import NotFound from '@/components/notfound/index.vue'
// 权限
import AdminRule from '@/components/authrule/index.vue'
// 角色组
import AuthGroup from '@/components/authgroup/index.vue'
// 用户认证
import UserAuth from '@/components/userauth/index.vue'
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
        {path: 'admin', component: Admin, name: 'admin'},
        {path: 'authrule', component: AdminRule, name: 'authrule'},
        {path: 'authgroup', component: AuthGroup, name: 'authgroup'},
        {path: 'userauth', component: UserAuth, name: 'userauth'}
      ]
    }
  ]
})
