<template>
  <div class="user-search">
    <topNav :oneInfo="menuInfo" :twoInfo="menuInfo2"></topNav>
    <topSearch></topSearch>
    <topAdd></topAdd>
  </div>

</template>

<script type="text/ecmascript-6">
  import topNav from '@/components/nav/nav.vue'
  import topSearch from '@/components/search/search.vue'
  import topAdd from '@/components/add/add.vue'
  export default {
      data() {
        return {
            menuInfo: '基础管理',
            menuInfo2: '用户管理'
        }
      },
      methods: {
        search(time1, time2, text) {
            console.log(time1, time2, text)
        }
      },
      components: {
        topNav, topSearch, topAdd
      }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
