<template>
  <div>
    <header id="header">
      <div class="left" v-loading.fullscreen.lock="fullscreenLoading">
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
        // 菜单数组
        menus: []
      }
    },
    created() {
      // vuex 获取菜单信息 每次请求都会重新获取
      this.fullscreenLoading = true
      this.$store.dispatch('ajaxMenu').then((res) => {
        // 存到vuex中去
        this.$store.commit('setMenus', res)
        // 关闭load
        this.fullscreenLoading = false
        this.menus = this.$store.state.menu.menus
      })
      // 获取当前用户名
      this.user_name = this.$lockr.get('user_name')
    },
    components: {
      Menus
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
