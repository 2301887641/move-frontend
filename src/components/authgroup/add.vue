<template>
  <div>
    <Modal
      v-model="authgroupadd"
      :mask-closable="maskClosable"
      :closable="closable">
      <p slot="header">
        <i class="fa fa-id-card" aria-hidden="true"></i>&nbsp;<span>添加角色</span>
      </p>
      <Form ref="formCustom" :model="form" :rules="ruleCustom" :label-width="80">
        <Form-item label="角色名称:" prop="name">
          <Input type="text" v-model="form.name" icon="ios-bolt"></Input>
        </Form-item>
      </Form>
      <el-alert
        title="权限列表"
        type="info"
        :closable="false"
        description="请给当前角色分配权限!!"
        show-icon>
      </el-alert>
      <br/>
        <el-tree
          :data="permissions"
          show-checkbox
          accordion
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          @check-change="checkTree"
        >
        </el-tree>
      <div slot="footer">
        <Button type="ghost" style="margin-left: 8px" @click="remove">取消</Button>
        <Button type="primary"  :loading="modal_loading" @click="addOk">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data() {
          return {
            authgroupadd: false,
            maskClosable: false,
            closable: false,
            modal_loading: false,
            form: {
              name: '',
              permissions_id: {}
            },
            ruleCustom: {
              name: [
                { required: true, message: '请输入角色名称', trigger: 'blur' }
              ]
            },
            defaultProps: {
              children: 'children',
              label: 'name'
            }
          }
        },
      props: {
        permissions: {
          default: Array
        }
      },
      methods: {
        // 取消操作
        remove() {
          this.authgroupadd = false
        },
        checkTree(data, node, text) {
          // 选中子节点的情况分为两类:
          // 1.node等于true的话说明当前被选中了 分为：如果是选择子类的话,父类不会被选中,所以需要在else中判断
          if (node === true) {
            this.form.permissions_id[data.id] = data.id
          } else {
            // 如果是父节点的话也需要加入到数组中
             if (data.parent_id === 0) {
               this.form.permissions_id[data.id] = data.id
             }
          }
        },
        // 保存操作
        addOk() {
          console.log(Object.keys(this.form.permissions_id))
          return
//          this.$refs.formCustom.validate((valid) => {
//            if (valid) {
//              this.form.permissions_id = this.$refs.tree.getCheckedKeys()
//              if (this.form.permissions_id.length === 0) {
//                this.$message.error('请选择权限!!')
//                return
//              }
//              console.log(this.form.permissions_id)
//                }
//              })
            }
        }
    }
</script>
