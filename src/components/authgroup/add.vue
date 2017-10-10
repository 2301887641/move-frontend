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
          :props="defaultProps">
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
              permissions: ''
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
        // 保存操作
        addOk() {
            console.log(this.$refs.tree.getCheckedKeys())
         }
        }
    }
</script>
