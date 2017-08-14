<template>
  <div>
    <vue-particles color="#dedede"></vue-particles>
    <div class="login-wrapper">
      <div class="login-title">
        <img src="/static/image/login-title.png" alt="">
      </div>
      <div class="login-form">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <Form-item prop="name">
            <Input type="text" v-model="formInline.name" placeholder="请输入用户名">
            <Icon type="person" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入密码">
            <Icon type="ios-locked" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="captcha">
            <Row>
              <Col span="12">
              <Input type="text" v-model="formInline.captcha" placeholder="请输入验证码" @on-change="blur">
              <Icon type="eye" slot="prepend"></Icon>
              </Input>
              </Col>
              <Col span="10" justify="end" push="2">
              <img class="login-captcha" :src="imageSrc" alt="验证码" width="120" height="32" @click="refreshCaptcha()">
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Button type="primary" long :loading="load" @click="login">登录</Button>
          </Form-item>
        </Form>
      </div>
    </div>
  </div>


</template>

<script type="text/ecmascript-6">
  export default{
      data () {
          return {
            // 加载状态
            load: false,
            // 验证码地址
            imageSrc: '',
            // 验证码验证后才可以提交表单
            canSubmit: false,
            // 表单对象
            formInline: {
            // 用户名 密码 验证码
                  name: '',
                  password: '',
                  captcha: ''
              },
            // 表单验证
            ruleInline: {
                name: [
                  {required: true, message: '请填写用户名'}
                ],
                password: [
                  {required: true, message: '请输入密码'}
                ],
                captcha: [
                  {required: true, message: '请输入验证码'}
                ]
            }
          }
      },
      created() {
        //  验证码地址
        this.imageSrc = this.$config.web + 'captcha'
      },
      methods: {
        //  刷新验证码
        refreshCaptcha() {
          this.imageSrc = this.imageSrc + '?id=' + Math.random()
        },
        // 验证码框输入内容时触发
        blur() {
          if (this.formInline.captcha.length === 4) {
             this.$http.unauthGet(this.$config.web + 'checkCaptcha/' + this.formInline.captcha, (response) => {
               if (response === -1) {
                  this.$message.error('网络错误!!')
                  return
               }
               (response.status === 'success') && (this.canSubmit = true)
             })
          }
        },
        // 登录操作
        login() {
            if (!this.canSubmit) {
               this.$message.error('验证码错误')
               return false
            }
            this.$refs.formInline.validate((volid) => {
                  if (!volid) {
                     this.load = false
                     return false
                  }
                  this.load = true
                  let data = {
                    username: this.formInline.name,
                    password: this.formInline.password,
                    grant_type: this.$config.grant_type,
                    client_id: this.$config.client_id,
                    client_secret: this.$config.client_secret,
                    scope: '*'
                  }
              this.$http.unauthPost(this.$config.login, data, (response, error) => {
                 if (response === -1) {
                   this.load = false
                   this.$message.error('用户名或密码错误,或当前用户被禁用')
                   this.canSubmit = false
                   return
                 }
                 this.load = false
                 this.$lockr.set('user_access_token', response.access_token)
                 this.$lockr.set('user_refresh_token', response.refresh_token)
                 this.$lockr.set('user_token_type', response.token_type)
                 this.$lockr.set('user_expires_in', response.expires_in)
                 this.$lockr.set('headers', {headers: {'Authorization': response.token_type + ' ' + response.access_token}})
                 this.getUser(response.access_token)
                 this.$router.replace('index')
              })
            })
        },
        // 获取用户信息
        getUser(token) {
          let headers = this.$lockr.get('headers')
          this.$http.get(this.$config.domain + 'admin/getUser', (response) => {
            if (response === -1) {
               this.$message.error('网络错误!!')
               return
            }
            this.$lockr.set('user_name', response.name)
           // 头部必须携带 否则无法验证
          }, headers)
        }
      }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
    body
     height:100%
     background:url("/static/image/login-background.jpg") no-repeat center center fixed
     background-size:cover
    .login-wrapper
      width:350px
      height:450px
      position:absolute
      top:35%
      left:50%
      margin-left:-(@width/2)
      margin-top:-(@height/2)
      /*background:#fffcc*/
      border:2px solid #fff
      border-radius:5px
      padding:25px 15px
      .login-title
         text-align:center
         padding:10px
      .login-form
         padding:10px
         .login-captcha
           cursor:pointer
</style>
