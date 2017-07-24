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
    <div id="left">
        <ul class="nav">
          <li class="nav-li" v-for="menu in menus" ref="getli"  @click.stop.prevent="toggleMenu(menu)"><span class="nav-li-span"><i class="fa" :class="menu.icon" aria-hidden="true">&nbsp;&nbsp;{{menu.text}}</i><span class="icon-double-down"><i class="fa fa-angle-double-down" aria-hidden="true"></i></span></span>
            <ul class="nav-son-ul"    v-show="menu.class" @click.stop>
                  <li class="nav-son-ul-li"  v-for="childMenu in menu.childMenus"><span class="nav-son-span" @click="childClick"><i class="fa fa-user-plus" aria-hidden="true">&nbsp;&nbsp;{{childMenu.text}}</i></span></li>
                </ul>
          </li>
        </ul>
    </div>
    <div id="right">
        dfasd
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 头部主题
        topTheme: 'primary',
        // 左侧主题
        theme: 'light',
        // 用户名
        user_name: '',
        menus: [{
          icon: 'fa-user-plus', // icon用于储存菜单对应的图标
          text: '用户管理', // text用于储存该菜单显示名称
          class: '',
          childMenus: [{
            href: '/app/services', // href用于设定该菜单跳转路由
            text: '服务信息' // text用于储存该菜单显示名称
          }, {
            href: '/app/add/service', // href用于设定该菜单跳转路由
            text: '新建' // text用于储存该菜单显示名称
          }]
        }, {
          icon: 'fa-cubes',
          text: '产品管理',
          class: '',
          childMenus: [{
            href: '/app/products',
            text: '产品信息'
          }, {
            href: '/app/add/product',
            text: '新建'
          }]
        }, {
          icon: 'fa-file-o',
          text: '日志管理',
          class: '',
          href: '/app/logs'
        }]
      }
    },
    created() {
      this.user_name = this.$lockr.get('user_name')
    },
    methods: {
      childClick($event) {
        let backColors = document.getElementsByClassName('nav-li-span-backColor')
        if (backColors.length > 0) {
            for (let i = 0; i < backColors.length; i++) {
                backColors[i].className = 'nav-son-span'
            }
        }
        let oldClassName = $event.currentTarget.className
        $event.currentTarget.className = oldClassName + ' nav-li-span-backColor'
      },
      // 切换菜单
      toggleMenu(menu) {
        let tempClass = menu.class
        this.menus.forEach(item => {
          item.class = ''
        })
        // 当菜单有href属性时，代表其将进行路由跳转而不是展开收起子菜单
        // 此时将其余菜单收起
        if (menu.href) {
          this.$router.push(menu.href)
          this.menus.forEach(item => {
            item.class = ''
          })
          menu.class = 'active'
          return
        }
        // 其他时候默认进行子菜单的切换
        menu.class = (tempClass === 'active') ? '' : 'active'
      }
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
          font-size: 25px
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
          font-size:20px
          border: none
          border-bottom: 1px solid transparent
          background: none
          display:flex
          flex-flow: row wrap
          .nav-li-span
            width:100%
            height:100%
            padding-left:20px
            box-sizing:border-box
            position:relative
            .icon-double-down
              font-size:20px
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
            font-size:20px
            border: none
            border-bottom: 1px solid transparent
            background: none
            display:flex
            .nav-son-span
              width:100%
              height:100%
              padding-left:50px
              box-sizing:border-box
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
