<template>
    <div>
      <Modal
        v-model="useradd"
        :mask-closable="maskClosable"
        :closable="closable">
        <p slot="header">
          <i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;<span>添加用户</span>
        </p>
        <Form ref="formCustom" :model="form" :rules="ruleCustom" :label-width="80">
          <Form-item label="用户名:" prop="name">
            <Input type="text" v-model="form.name"></Input>
          </Form-item>
          <Form-item label="邮箱:" prop="email">
            <Input type="text" v-model="form.email"></Input>
          </Form-item>
          <Form-item label="密码:" prop="password">
            <Input type="password" v-model="form.password"></Input>
          </Form-item>
          <Form-item label="确认密码:" prop="confirmPassword">
            <Input type="password" v-model="form.confirmPassword"></Input>
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
  export default {
    data() {
      const validatePassCheck = (rule, value, callback) => {
            if (!value) {
              callback('请输入确认密码')
              return
            } else if (value !== this.form.password) {
              callback('两次密码输入不一样')
              return
            } else {
              callback()
            }
      }
      return {
        useradd: false,
        maskClosable: false,
        modal_loading: false,
        closable: false,
        form: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        ruleCustom: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          confirmPassword: [
            { validator: validatePassCheck, required: true, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      addOk() {
        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            let headers = this.$lockr.get('headers')
            this.$http.post(this.$config.domain + 'admin/base', this.form, (response) => {
              this.useradd = false
              this.$refs.formCustom.resetFields()
              this.$parent.index()
            }, headers)
          }
        })
      },
      remove() {
        this.$refs.formCustom.resetFields()
        this.useradd = false
      }
    }
  }
</script>
