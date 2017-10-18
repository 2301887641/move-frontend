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
        type="warning"
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
          @node-expand="expand"
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
            // 展开后的一级树对象 和二级树对象
            levelOne: {},
            levelTwo: {},
            ruleCustom: {
              name: [
                { required: true, message: '请输入角色名称', trigger: 'blur' }
              ]
            },
            // 指定树形结构规则 子级在children中
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
        // 展开树
        expand(obj, node, data) {
          // 一级展开和二级展开
          if (node.level === 1) {
             this.levelOne[obj.id] = node
          } else if (node.level === 2) {
             this.levelTwo[obj.id] = node
          }
        },
        loop(id) {
          // 如果在二级里面有的话
            if (this.levelTwo[id]) {
              this.form.permissions_id[id] = this.levelTwo[id]
            } else if (this.levelOne[id]) {
              this.form.permissions_id[id] = this.levelOne[id]
            }
        },
        // 保存操作
        addOk() {
          let checkedNodes = this.$refs.tree.getCheckedNodes()
          if (checkedNodes.length < 1) {
            this.$notify.error({
              title: '错误',
              message: '请先选择权限!!'
            })
          }
          console.log(this.levelOne, this.levelTwo)
          console.log(checkedNodes)
          for (let v of checkedNodes) {
            this.form.permissions_id[v.id] = v.id
            if (v.parent_id !== 0) {
              this.loop(v.parent_id)
            }
          }
          return
//          console.log(this.form.permissions_id)
//          return
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
