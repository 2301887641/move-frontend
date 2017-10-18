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
          prop="rule"
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
    <!--<authruleSave ref="authruleSaveRef" :authlist='authlist' :form='saveData'></authruleSave>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import topAdd from '@/components/add/add.vue'
  import authgroupAdd from '@/components/authgroup/add.vue'
    export default{
      data() {
        return {
          stripe: true,
          tableData: [],
          total: 0,
          permissions: []
        }
      },
      components: {
        topAdd, authgroupAdd
      },
      created() {
        this.getPermissions()
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
        getPermissions() {
          let headers = this.$lockr.get('headers')
          this.$http.get(this.$config.domain + 'getPermissions', (response) => {
            this.permissions = response
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
