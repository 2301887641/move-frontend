<template>
  <div>
    <header id="header">
      <div class="left">
        <i class="fa fa-windows fa-3x" aria-hidden="true"></i>
        <span class="text-logo">Admin</span><span class="text-slogan">管理后台</span>
      </div>
      <div class="center">
        <span><i class="fa fa-arrow-circle-o-left fa-3x" aria-hidden="true"></i></span>
      </div>
      <div class="right">
        <span class="right-message"><i class="fa fa-bell fa-2x" aria-hidden="true"></i><span class="notification">3</span></span>
        <span class="right-user"><img src="/static/image/user.jpg" alt="">&nbsp;admin</span>
        <span class="right-wrapper"><i class="fa fa-user-circle fa-3x" aria-hidden="true"></i><span class="notification">3</span></span>
      </div>
    </header>
    <!--左菜单-->
    <div id="left">
      <Menus :menus="menus"></Menus>
    </div>
    <!--右路由-->
    <div id="right">
        <router-view></router-view>
    </div>
    <el-button
      type="primary"
      v-loading.fullscreen.lock="fullscreenLoading">
    </el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import Menus from '@/components/menu/index.vue'
  export default {
    data() {
      return {
        // 全屏load
        fullscreenLoading: false,
        // 用户名
        user_name: '',
        menus: []
//        menus: [{
//          icon: 'fa-user-plus', // icon用于储存菜单对应的图标
//          text: '用户管理', // text用于储存该菜单显示名称
//          class: '',
//          childMenus: [{
//            href: '/app/services', // href用于设定该菜单跳转路由
//            text: '服务信息' // text用于储存该菜单显示名称
//          }, {
//            href: '/app/add/service', // href用于设定该菜单跳转路由
//            text: '新建' // text用于储存该菜单显示名称
//          }]
//        }, {
//          icon: 'fa-cubes',
//          text: '产品管理',
//          class: '',
//          childMenus: [{
//            href: '/app/products',
//            text: '产品信息'
//          }, {
//            href: 'index',
//            text: '新建'
//          }]
//        }, {
//          icon: 'fa-th-large',
//          text: '基础管理',
//          class: '',
//          childMenus: [{
//            icon: 'fa-user-plus',
//            href: '/index/admin',
//            text: '用户管理'
//          }, {
//            href: 'index',
//            text: '新建'
//          }]
//        }, {
//          icon: 'fa-users',
//          text: '后台管理',
//          class: '',
//          childMenus: [{
//            icon: 'fa-user-plus',
//            href: '/index/admin',
//            text: '用户管理'
//          }, {
//            icon: 'fa-user-plus',
//            href: '/index/authrule',
//            text: '权限'
//          }]
//        }]
      }
    },
    created() {
      this.fullscreenLoading = true
      this.$store.dispatch('ajaxMenu').then((res) => {
        this.$store.commit('setMenus', res)
        this.fullscreenLoading = false
        this.menus = this.$store.state.menu.menus
      })
      this.user_name = this.$lockr.get('user_name')
    },
    components: {
      Menus
    },
    methods: {
      // 点击二级菜单后显示背景
//      childClick($event) {
//        let backColors = document.getElementsByClassName('nav-li-span-backColor')
//        if (backColors.length > 0) {
//            for (let i = 0; i < backColors.length; i++) {
//                backColors[i].className = 'nav-son-span'
//            }
//        }
//        let oldClassName = $event.currentTarget.className
//        $event.currentTarget.className = oldClassName + ' nav-li-span-backColor'
//      },
      // 切换菜单
//      toggleMenu(menu) {
//        let tempClass = menu.class
//        this.menus2.forEach(item => {
//          item.class = ''
//        })
//        // 当菜单有href属性时，代表其将进行路由跳转而不是展开收起子菜单
//        // 此时将其余菜单收起
//        if (menu.parent_id > 0) {
//          this.$router.push(menu.role)
//          this.menus2.forEach(item => {
//            item.class = ''
//          })
//          menu.class = 'active'
//          return
//        }
//        // 其他时候默认进行子菜单的切换
//        menu.class = (tempClass === 'active') ? '' : 'active'
//      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  body
    background: #fff
    #header
      width: 100%
      height: 60px
      background-color:#75b9e6
      display:flex
      padding:0 30px
      box-sizing:border-box
      align-items:center
      span.notification
        background-color: #f68484
        border-radius: 4px
        font: bold 11px Arial
        color: #ffffff
        line-height: 20px
        min-width: 20px
        position: absolute
        top: 6px
        right: 10px
        text-align: center
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1)
      .left
        width: 250px
        vertical-align:center
        span
          font-weight: bold
          font-family: 'Droid Sans'
          font-size: 15px
        .text-logo
          color: #124363
          margin-left:15px
        .text-slogan
          color:#fff
      .center
         width:500px
         color:#fff
         height:100%
         span
           display:inline-block
           width: 60px
           height:60px
           text-align:center
         :hover
            cursor:pointer
            background:#4aa3de
           i
             line-height:60px
      .right
         width:300px
         height:60px
         display:flex
         justify-content:flex-end
         flex-grow:2
         align-items:center
         color:#fff
         span.right-message
         span.right-wrapper
           width:70px
           height:60px
           text-align:center
           position:relative
         span.right-message:hover
         span.right-wrapper:hover
           cursor:pointer
           background:#4aa3de
         span.right-user
           height:60px
           color: #ffffff
           width: 180px
           position: relative
           transition: all
           transition-duration: 0.4s
           overflow-x: hidden
           outline: none
           display:flex
           align-items:center
           justify-content:center
           font-size:17px
         img
           border-radius:5px
         span.right-user:hover
           cursor:pointer
           background:#4aa3de
         i
           line-height:60px
    #left
      width: 15%
      height:auto
      background:#f3f5f6
      position: absolute
      left: 0
      bottom: 0
      top: 60px
      .nav
        width:100%
        height:auto
        display:flex
        flex-direction:column
        align-items:center
        box-sizing:border-box
        li.nav-li
          width:100%
          line-height:60px
          font-size:15px
          border: none
          border-bottom: 1px solid transparent
          background: none
          display:flex
          flex-flow: row wrap
          .nav-li-span
            width:100%
            padding-left:20px
            box-sizing:border-box
            position:relative
            .icon-double-down
              font-size:15px
              position:absolute
              right:20px
          .nav-li-span:hover
             background-color:#e4e9eb
             cursor:pointer
          ul.nav-son-ul
           width:100%
           height:auto
           display:flex
           flex-direction:column
           li.nav-son-ul-li
            width:100%
            line-height:60px
            font-size:15px
            border: none
            border-bottom: 1px solid transparent
            background: none
            display:flex
            a
             width:100%
             .nav-son-span
              width:100%
              height:100%
              padding-left:50px
              box-sizing:border-box
              display:inline-block
            .nav-li-span-backColor
            .nav-son-span:hover
              background-color:#e4e9eb
              cursor:pointer
    #right
      width:85%
      height:auto
      background:#fff
      position:absolute
      right:0
      bottom:0
      top: 60px
</style>
