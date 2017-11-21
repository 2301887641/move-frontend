<template>
  <div class="authrule-component">
    <!--<topNav :oneInfo="menuInfo" :twoInfo="menuInfo2"></topNav>-->
    <!--<topSearch></topSearch>-->
    <topAdd :count="total"></topAdd>
    <div class="table">
      <el-table :stripe="stripe" ref="multipleTable" @selection-change="selectData" :data="tableData" border tooltip-effect="dark" style="width:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="name"
          label="栏目名称"
          :formatter="formatterData"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rule"
          label="权限规则"
        >
        </el-table-column>
        <el-table-column
          prop="role"
          label="路由"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="是否支持详细规则"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="是否启用"
          :formatter="formatterStatus"
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
    <authruleAdd ref="authruleAddRef" :authlist='authlist'></authruleAdd>
    <authruleSave ref="authruleSaveRef" :authlist='authlist' :form='saveData'></authruleSave>
  </div>
</template>

<script type="text/ecmascript-6">
//  import topNav from '@/components/nav/nav.vue'
//  import topSearch from '@/components/search/search.vue'
  import topAdd from '@/components/add/add.vue'
  import authruleAdd from '@/components/authrule/add.vue'
  import authruleSave from '@/components/authrule/save.vue'
    export default {
       data () {
         return {
           tableData: [],
           total: 0,
           authlist: {},
           saveData: {},
           stripe: true
         }
       },
      created() {
         this.index()
      },
      components: {
        topAdd, authruleAdd, authruleSave
      },
      methods: {
        formatterStatus(row, column, cellValue) {
          if (row.status === 1) {
            return '已启用'
          }
        },
        formatterData(row, column, cellValue) {
          return '------'.repeat(row.level) + row.name
        },
        // 根据id查找并传给修改组件
        updateRow(index, data) {
          let headers = this.$lockr.get('headers')
          let id = data[index].id
          this.$http.get(this.$config.domain + 'authGroup/base' + id + '/edit', (response) => {
            this.saveData = response.data
            this.$refs.authruleSaveRef.authrulesave = true
            this.getList()
          }, headers)
        },
        // 点击选择删除
        selectData(selection) {
          this.deleteArr = []
          for (let i in selection) {
            this.deleteArr.push(selection[i].id)
          }
        },
        // 添加
        add() {
          this.getList()
          this.$refs.authruleAddRef.authruleadd = true
        },
        // 获取上级权限列表
        getList() {
          let header = this.$lockr.get('headers')
          this.$http.get(this.$config.domain + 'authRule/create', (response) => {
            this.authlist = response.data
          }, header)
        },
        // 表格列表
        index() {
          let header = this.$lockr.get('headers')
          this.$http.get(this.$config.domain + 'authRule', (response) => {
            this.tableData = response.data.data
            this.total = response.data.total
          }, header)
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
