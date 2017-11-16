<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // 添加事件总线 发布订阅模式
  import Vue from 'vue'
export default {
  name: 'app',
  beforeCreate() {
     this.$root.Eventbus = new Vue()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .table
      width:97%
      margin:10px auto
    .paginate
      display:flex
      justify-content:flex-end
      margin-right:20px
</style>
