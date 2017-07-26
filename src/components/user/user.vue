<template>
  <div class="user-search">
    <topNav :oneInfo="menuInfo" :twoInfo="menuInfo2"></topNav>
    <topSearch></topSearch>
  </div>

</template>

<script type="text/ecmascript-6">
  import topNav from '@/components/nav/nav.vue'
  import topSearch from '@/components/search/search.vue'
  export default {
      data() {
        return {
            menuInfo: '基础管理',
            menuInfo2: '用户管理'
        }
      },
      components: {
        topNav, topSearch
      }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
