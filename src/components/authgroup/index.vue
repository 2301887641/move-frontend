<template>
  <div class="authgroup-component">
    <!--<topNav :oneInfo="menuInfo" :twoInfo="menuInfo2"></topNav>-->
    <!--<topSearch></topSearch>-->
    <topAdd :count="total"></topAdd>
    <div class="table">
      <el-table :stripe="stripe" ref="multipleTable" @selection-change="selectData" :data="tableData" border tooltip-effect="dark" style="width:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="name"
          label="角色组名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="permissions_name"
          label="权限规则"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="是否启用"
        >
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
    <!--:authlist='authlist'-->
    <authgroupAdd ref="authgroupAddRef" :permissions="permissions"></authgroupAdd>
    <authgroupSave ref="authgroupSaveRef" :permissions='permissions' :form='saveData' :treeClickId="treeClickId"></authgroupSave>
  </div>
</template>

<script type="text/ecmascript-6">
  import topAdd from '@/components/add/add.vue'
  import authgroupAdd from '@/components/authgroup/add.vue'
  import authgroupSave from '@/components/authgroup/save.vue'
    export default{
      data() {
        return {
          stripe: true,
          tableData: [],
          total: 0,
          permissions: [],
          treeClickId: [],
          // 表格数据
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
      components: {
        topAdd, authgroupAdd, authgroupSave
      },
      created() {
        this.getPermissions()
        this.index()
      },
      methods: {
        // 点击选择删除
        selectData(selection) {
          this.deleteArr = []
          for (let i in selection) {
            this.deleteArr.push(selection[i].id)
          }
        },
        // 添加
        add() {
          this.$refs.authgroupAddRef.authgroupadd = true
        },
        // 获取权限树
        getPermissions() {
          let headers = this.$lockr.get('headers')
          this.$http.get(this.$config.domain + 'getPermissions', (response) => {
            this.permissions = response
          }, headers)
        },
        // 首页数据获取
        index() {
          let headers = this.$lockr.get('headers')
          headers.params = {
            page: this.page,
            stime: this.stime,
            etime: this.etime,
            name: this.name
          }
          this.$http.get(this.$config.domain + 'authGroup', (response) => {
            this.tableData = response.data.data
            this.total = response.data.total
          }, headers)
        },
        // 修改操作
        updateRow(index, data) {
          let headers = this.$lockr.get('headers')
          let id = data[index].id
          this.$http.get(this.$config.domain + 'authGroup/' + id, (response) => {
            this.saveData = response.data
            this.$refs.authgroupSaveRef.setTree(this.saveData.permission_id)
            this.$refs.authgroupSaveRef.authgroupsave = true
          }, headers)
        },
        // 删除
        deleteRow(index, data) {
          let id = data[index].id
          let headers = this.$lockr.get('headers')
          this.$http.delete(this.$config.domain + 'authGroup/' + id, (response) => {
            this.index()
          }, headers)
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .authgroup-component
    .table
      width:97%
      margin:10px auto
    .paginate
      display:flex
      justify-content:flex-end
      margin-right:20px
</style>
