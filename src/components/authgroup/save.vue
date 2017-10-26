<template>
    <div>
      <Modal
        v-model="authgroupsave"
        :mask-closable="maskClosable"
        :closable="closable">
        <p slot="header">
          <i class="fa fa-id-card" aria-hidden="true"></i>&nbsp;<span>修改角色</span>
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
          default-expand-all
          @node-expand="expand"
        >
        </el-tree>
      </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        authgroupsave: false,
        maskClosable: false,
        closable: false,
        // 展开后的一级树对象 和二级树对象
        levelTwo: {},
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
        default: Object
      },
      form: {
        default: Object
      }
    },
    methods: {
      setClick() {
        // 需要转成数组
        let arr = this.form.permission_id.split(',')
        console.log(arr)
        console.log(1111111111)
        setTimeout(() => {
          this.$refs.tree.setCheckedKeys(arr)
        }, 3000)
      },
      // 展开树
      expand(obj, node, data) {
        // 一级展开和二级展开
        if (node.level === 2) {
          this.levelTwo[obj.id] = node
        }
      }
    }
  }
</script>
