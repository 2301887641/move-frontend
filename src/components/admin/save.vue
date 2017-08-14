<template>
  <div>
    <Modal
      v-model="usersave"
      :mask-closable="maskClosable"
      :closable="closable">
      <p slot="header">
        <i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;<span>修改用户</span>
      </p>
      <Form ref="formCustom" :model="form" :rules="ruleCustom" :label-width="80">
        <Form-item label="用户名:" prop="name">
          <Input type="text" v-model="form.name"></Input>
        </Form-item>
        <Form-item label="邮箱:" prop="email">
          <Input type="text" v-model="form.email"></Input>
        </Form-item>
        <Form-item label="密码:" prop="">
          <Input type="password" v-model="pwd.password"></Input>
        </Form-item>
        <Form-item label="确认密码:" prop="">
          <Input type="password" v-model="pwd.confirmPassword"></Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="ghost" style="margin-left: 8px" @click="remove">取消</Button>
        <Button type="primary"  :loading="modal_loading" @click="saveOk">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        usersave: false,
        maskClosable: false,
        modal_loading: false,
        closable: false,
        pwd: {
          password: '',
          confirmPassword: ''
        },
        ruleCustom: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      saveOk() {
        this.$refs.formCustom.validate((valid) => {
          if (valid && this.checkPwd()) {
            let headers = this.$lockr.get('headers')
            let id = this.form.id
            let data = {
              name: this.form.name,
              email: this.form.email,
              password: this.pwd.password
            }
            this.$http.put(this.$config.domain + 'admin/' + id, data, (response) => {
              this.resetPwd()
              this.$parent.index()
            }, headers)
          }
        })
      },
      resetPwd() {
        this.pwd.confirmPassword = ''
        this.pwd.password = ''
        this.usersave = false
      },
      // 检查密码
      checkPwd() {
        if (this.pwd.password && !this.pwd.confirmPassword) {
           this.$message.error('请输入确认密码')
           return false
        } else if (!this.pwd.password && this.pwd.confirmPassword) {
           this.$message.error('请输入密码')
           return false
        } else if (this.pwd.password && this.pwd.confirmPassword) {
          if (this.pwd.password !== this.pwd.confirmPassword) {
            this.$message.error('两次密码不一致')
            return false
          }
        }
           return true
      },
      remove() {
        this.resetPwd()
      }
    },
    props: {
      form: {
        default: Object
      }
    }
  }
</script>
