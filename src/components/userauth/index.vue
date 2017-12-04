<template>
  <div class="userauth-component">
    <!--<topNav :oneInfo="menuInfo" :twoInfo="menuInfo2"></topNav>-->
    <!--<topSearch></topSearch>-->
    <topAdd :count="total"><div slot="self"></div></topAdd>
    <div class="table">
      <el-table ref="multipleTable" @selection-change="selectData" :data="tableData" border tooltip-effect="dark" style="width:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="name"
          label="用户"
        >
        </el-table-column>
        <el-table-column
          prop="group_id"
          label="角色"
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
    <userauthAdd ref="userauthAddRef" :userList="userList" :authGroup="authGroup"></userauthAdd>
    <!--<userSave ref="userSaveRef" :form="saveData"></userSave>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import topAdd from '@/components/add/add.vue'
  import userauthAdd from '@/components/userauth/add.vue'
  export default{
    data() {
      return {
        total: 0,
        currentPage: 1,
        tableData: [],
        userList: [],
        authGroup: []
      }
    },
    components: {
      topAdd, userauthAdd
    },
    created() {
      this.getUserList()
    },
    methods: {
      // 获取表格数据
      index() {
        this.$http.get(this.$config.domain + 'authGroupAccess/base', (response) => {
            this.tableData = response.data.data
            this.total = response.data.total
        })
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
        this.getUserList()
        this.getAuthGroup()
        this.$refs.userauthAddRef.userauthadd = true
      },
      // 获取用户列表
      getUserList() {
        this.$http.get(this.$config.domain + 'admin/userList', (response) => {
          this.userList = response.data
        })
      },
      // 获取角色列表
      getAuthGroup() {
        this.$http.get(this.$config.domain + 'authGroup/base/create', (response) => {
          this.authGroup = response.data
        })
      },
      // 修改数据
      updateRow(index, data) {
          console.log(index)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
