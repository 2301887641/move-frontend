<template>
  <div class="user-component">
    <topNav :oneInfo="menuInfo" :twoInfo="menuInfo2"></topNav>
    <topSearch></topSearch>
    <topAdd :count="total"></topAdd>
    <div class="table">
      <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮件帐号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template scope="scope">
            <el-button
              @click.native.prevent="updateRow(scope.$index, tableData)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginate">
      <el-pagination
        layout="prev, pager, next"
        :total="total" @current-change="currentPage">
      </el-pagination>
    </div>
    <userAdd ref="userAddRef"></userAdd>
  </div>
</template>

<script type="text/ecmascript-6">
  import topNav from '@/components/nav/nav.vue'
  import topSearch from '@/components/search/search.vue'
  import topAdd from '@/components/add/add.vue'
  import userAdd from '@/components/user/add.vue'
  export default {
      data() {
        return {
           // 头部tag
            menuInfo: '基础管理',
            menuInfo2: '用户管理',
          // 表格数据
            tableData: [],
          // 分页数据
            total: 0,
            page: 1,
          // 修改获取到的数据
            saveData: {}
        }
      },
      created() {
          this.index()
      },
      methods: {
        // 表格首页
        index() {
          let headers = this.$lockr.get('headers')
          headers.params = {
             page: this.page
          }
          this.$http.get(this.$config.domain + 'user', (response) => {
            this.tableData = response.data.data
            this.total = response.data.total
          }, headers)
        },
        // 分页点击
        currentPage(page) {
          this.page = page
          this.index()
        },
        // 查询
        search(time1, time2, text) {
            console.log(time1, time2, text)
        },
        // 根据id查找并传给修改组件
        updateRow(index, data) {
          let headers = this.$lockr.get('headers')
          let id = data[index].id
          this.$http.get(this.$config.domain + 'user/getOne/' + id, (response) => {
            this.saveData = response.data
          }, headers)
        },
        // 弹出添加用户窗口
        add() {
          this.$refs.userAddRef.useradd = true
        },
        // 执行添加用户
        addOk(data) {
          let headers = this.$lockr.get('headers')
          this.$http.post(this.$config.domain + 'user/add', data, (response) => {

          }, headers)
        }
      },
      components: {
        topNav, topSearch, topAdd, userAdd
      }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
    .user-component
      .table
        width:97%
        margin:10px auto
      .paginate
        display:flex
        justify-content:flex-end
        margin-right:20px
</style>
