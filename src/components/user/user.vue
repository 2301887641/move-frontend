<template>
  <div class="user-component">
    <topNav :oneInfo="menuInfo" :twoInfo="menuInfo2"></topNav>
    <topSearch></topSearch>
    <topAdd></topAdd>
    <!--<div class="table">-->
      <!--<el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width:100%">-->
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="姓名"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="address"-->
          <!--label="地址"-->
          <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
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
      created() {
          this.index()
      },
      methods: {
        index() {
          let token = this.$lockr.set('user_access_token')
          this.$http.get(this.$config.domain + 'user', {
            // 头部必须携带 否则无法验证
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).then((response) => {
            if (response.status === 200) {
              console.log(response)
            }
          })
        },
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
    .user-component
      .table
        width:97%
        margin:10px auto
</style>
