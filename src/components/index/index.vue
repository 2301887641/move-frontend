<template>
  <div class="container">
    <div class="top">

      <Menu mode="horizontal" :theme="topTheme" active-name="1">
        <div class="logo">
          <img src="/static/image/logo.png">
        </div>
        <Menu-item name="1">
          <Icon type="ios-paper"></Icon>
          内容管理

        </Menu-item>
        <Menu-item name="2">
          <Icon type="ios-people"></Icon>
          用户管理

        </Menu-item>
        <Submenu name="3">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            统计分析

          </template>
          <Menu-group title="使用">
            <Menu-item name="3-1">新增和启动</Menu-item>
            <Menu-item name="3-2">活跃分析</Menu-item>
            <Menu-item name="3-3">时段分析</Menu-item>
          </Menu-group>
          <Menu-group title="留存">
            <Menu-item name="3-4">用户留存</Menu-item>
            <Menu-item name="3-5">流失用户</Menu-item>
          </Menu-group>
        </Submenu>
        <Menu-item name="4">
          <Icon type="settings"></Icon>
          综合设置

        </Menu-item>
        <div class="user">
          <span><Icon type="home"></Icon>&nbsp;&nbsp;首页</span>
          <span><Icon type="ios-locked"></Icon>&nbsp;&nbsp;修改密码</span>
          <span><Icon type="log-out"></Icon>&nbsp;&nbsp;退出</span>
        </div>
      </Menu>
    </div>
    <div class="left">
      <Menu :theme="theme">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            内容管理

          </template>
          <Menu-item name="1-1">文章管理</Menu-item>
          <Menu-item name="1-2">评论管理</Menu-item>
          <Menu-item name="1-3">举报管理</Menu-item>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-people"></Icon>
            用户管理

          </template>
          <Menu-item name="2-1">新增用户</Menu-item>
          <Menu-item name="2-2">活跃用户</Menu-item>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            统计分析

          </template>
          <Menu-group title="使用">
            <Menu-item name="3-1">新增和启动</Menu-item>
            <Menu-item name="3-2">活跃分析</Menu-item>
            <Menu-item name="3-3">时段分析</Menu-item>
          </Menu-group>
          <Menu-group title="留存">
            <Menu-item name="3-4">用户留存</Menu-item>
            <Menu-item name="3-5">流失用户</Menu-item>
          </Menu-group>
        </Submenu>
      </Menu>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        topTheme: 'primary',
        theme: 'light'
      }
    },
    created() {
        let tokens = this.$lockr.get('access_token')
        this.$http.get(this.$config.domain + 'user', {
          headers: {
            'Authorization': 'Bearer ' + tokens
          }
        }).then((response) => {
            console.log(response)
        })
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
 body
  background:#fff
  .container
    height: 100%
    .top
      width: 100%
      .logo
        width: 240px
        float: left
        text-align: center
        img
          height: 40px
          vertical-align: middle
      .user
        float: right
        margin-right: 20px
        color: #fff
        span
          display: inline-block
          height: 100%
          padding: 0 20px
          cursor: pointer
        :hover
          background-color: #2b85e4
          transition: all .2s ease-in-out
    .left
      display: inline-block
      height: 100%
      .ivu-menu
        height: 100%

  /*background:#F8F8F8*/
</style>
