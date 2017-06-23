<template>
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
               <Input type="text" v-model="formInline.captcha" placeholder="请输入验证码">
                <Icon type="eye" slot="prepend"></Icon>
               </Input>
              </Col>
              <Col span="8" justify="end" push="4">
              <img src="http://www.api.com/api/captcha" alt="验证码" width="100" height="32">
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Button type="primary" long :loading="load">登录</Button>
          </Form-item>
        </Form>
      </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default{
      data () {
          return {
            load: false,
            imageSrc: 111,
            formInline: {
                  name: '',
                  password: '',
                  captcha: ''
              },
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
          this.getCaptcha()
      },
      methods: {
        getCaptcha() {
            let _this = this
          window.axios.get('http://www.api.com/api/captcha').then(function(response) {
              _this.imageSrc = response.data
            })
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
      height:350px
      position:absolute
      top:35%
      left:50%
      margin-left:-(@width/2)
      margin-top:-(@height/2)
      /*background:#fffcc*/
      border:1px solid #000
      border-radius:5px
      padding:25px 15px
      .login-title
         text-align:center
         padding:10px
      .login-form
         padding:10px
</style>
