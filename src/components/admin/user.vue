<template>
  <div class="user-component">
    <topNav :oneInfo="menuInfo" :twoInfo="menuInfo2"></topNav>
    <topSearch></topSearch>
    <topAdd :count="total"></topAdd>
    <div class="table">
      <el-table ref="multipleTable" @selection-change="selectData" :data="tableData" border tooltip-effect="dark" style="width:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮件帐号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="日期"
          width="220">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template scope="scope">
            <el-popover
              ref="popover"
              placement="top"
              width="160"
              trigger="hover">
              <div style="text-align: center; margin: 0">
                <i class="fa fa-trash" aria-hidden="true"></i>&nbsp;<span>确定删除吗？</span>
                <el-button type="primary" size="mini" @click.native.prevent="deleteRow(scope.$index, tableData)">确定</el-button>
              </div>
            </el-popover>
            <el-button
              @click.native.prevent="updateRow(scope.$index, tableData)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button v-popover:popover type="text"
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
    <userSave ref="userSaveRef" :form="saveData"></userSave>
  </div>
</template>

<script type="text/ecmascript-6">
  import topNav from '@/components/nav/nav.vue'
  import topSearch from '@/components/search/search.vue'
  import topAdd from '@/components/add/add.vue'
  import userAdd from '@/components/admin/add.vue'
  import userSave from '@/components/admin/save.vue'
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
            saveData: {},
          // 删除id
            deleteArr: [],
          // 开始结束时间
            stime: 0,
            etime: 0,
          // 根据用户名查询
            name: ''
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
             page: this.page,
             stime: this.startTime,
             etime: this.endTime,
             name: this.name
          }
          this.$http.get(this.$config.domain + 'admin', (response) => {
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
          this.stime = time1
          this.etime = time2
          this.name = text
        },
        // 根据id查找并传给修改组件
        updateRow(index, data) {
          let headers = this.$lockr.get('headers')
          let id = data[index].id
          this.$http.get(this.$config.domain + 'admin/' + id, (response) => {
            this.saveData = response.data
            this.$refs.userSaveRef.usersave = true
          }, headers)
        },
        // 弹出添加用户窗口
        add() {
          this.$refs.userAddRef.useradd = true
        },
        // 删除操作
        deleteRow(index, data) {
          let id = data[index].id
          let headers = this.$lockr.get('headers')
          this.$http.delete(this.$config.domain + 'admin/' + id, (response) => {
              this.index()
          }, headers)
        },
        // 点击选择删除
        selectData(selection) {
          this.deleteArr = []
          for (let i in selection) {
            this.deleteArr.push(selection[i].id)
          }
        },
        // 删除全部
        deleteAll() {
          let headers = this.$lockr.get('headers')
          let data = {
            id: this.deleteArr
          }
          this.$http.post(this.$config.domain + 'admin/delAll', data, (response) => {
            this.index()
          }, headers)
        }
      },
      components: {
        topNav, topSearch, topAdd, userAdd, userSave
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
