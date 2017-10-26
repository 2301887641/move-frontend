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

<style>

</style>
