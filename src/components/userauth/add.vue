<template>
    <div>
      <Modal
        v-model="userauthadd"
        :mask-closable="maskClosable"
        :closable="closable"
      >
      <p slot="header">
        <i class="fa fa-lock" aria-hidden="true"></i> <span>添加用户组认证</span>
      </p>
        <Form ref="formCustom" :model="form" :rules="ruleCustom" :label-width="80">
          <Form-item label="用户:" prop="uid">
            <Select v-model="form.uid" style="width:200px" clearable>
              <Option v-for="item in userList" :value="item.id" :key="item.text">{{item.text}}</Option>
            </Select>
          </Form-item>
          <Form-item label="角色:" prop="group_id">
            <Select v-model="form.group_id" multiple style="width:200px" placeholder="请选择角色组合">
              <Option v-for="item in authGroup" :value="item.id" :key="item.text">{{item.text}}</Option>
            </Select>
          </Form-item>
        </Form>
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
        modal_loading: false,
        userauthadd: false,
        maskClosable: false,
        closable: false,
        form: {
          uid: '',
          group_id: []
        },
        ruleCustom: {
          uid: [
            {type: 'number', required: true, message: '请选择用户', triggle: 'change'}
          ],
          group_id: [
            {type: 'array', required: true, message: '请选择角色', triggle: 'change'}
          ]
        }
      }
    },
    methods: {
        remove() {
          this.userauthadd = false
        },
        addOk() {
          this.$refs.formCustom.validate((valid) => {
            if (valid) {
                console.log(34343)
            }
          })
      }
    },
    props: {
      userList: {
        default: Array
      },
      authGroup: {
        default: Array
      }
    }
  }
</script>
