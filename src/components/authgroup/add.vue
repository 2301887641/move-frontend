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
        default-expand-all
        :props="defaultProps"
        :filter-node-method="tree"
      >
      </el-tree>
      <div slot="footer">
        <Button type="ghost" style="margin-left: 8px" @click="remove">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="addOk">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        authgroupadd: false,
        maskClosable: false,
        closable: false,
        modal_loading: false,
        form: {
          name: '',
          permission_id: {}
        },
        // 展开后的一级树对象 和二级树对象
        levelTwo: {},
        permissions_id: {},
        ruleCustom: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
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
      tree(value, data, node) {
        if (node.level === 2) {
          this.levelTwo[node.id] = node
        }
        return true
      },
      // 取消操作
      remove() {
        this.authgroupadd = false
      },
      // 在一级或二级中查找
      loop(id) {
        // 如果在二级里面有的话
        if (this.levelTwo[id]) {
          this.permissions_id[id] = parseInt(id)
         }
      },
      // 保存操作
      addOk() {
        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            let checkedNodes = this.$refs.tree.getCheckedNodes()
            if (checkedNodes.length < 1) {
              this.$notify.error({
                title: '错误',
                message: '请先选择权限!!'
              })
              return
            }
            // 遍历点击的节点
            checkedNodes.forEach((v, k) => {
              // 先放入到权限数组中
              this.permissions_id[v.id] = parseInt(v.id)
              if (v.parent_id !== 0) {
                this.loop(v.parent_id)
              }
            })
            this.form.permission_id = Object.values(this.permissions_id)
            let headers = this.$lockr.get('headers')
            this.$http.post(this.$config.domain + 'authGroup/base/', this.form, (response) => {
              this.authgroupadd = false
              // 清空树
              this.$refs.tree.setCheckedKeys([])
              // 清空form
              this.$refs.formCustom.resetFields()
              this.$parent.index()
            }, headers)
            this.permissions_id = {}
          }
        })
      }
    }
  }
</script>
