<template>
  <div>
    <Modal
      v-model="authrulesave"
      :mask-closable="maskClosable"
      :closable="closable">
      <p slot="header">
        <i class="fa fa-product-hunt" aria-hidden="true"></i>&nbsp;<span>修改权限</span>
      </p>
      <Form ref="formCustom" :model="form" :rules="ruleCustom" :label-width="80">
        <Form-item label="上级权限:" prop="parent_id">
          <Select v-model="form.parent_id" style="width:200px">
            <Option :value="0">顶级权限</Option>
            <!--如果是当前的权限 取消显示-->
            <Option v-for="item in authlist" :value="item.id" :key="item.name" v-if="item.id != form.id">
                {{"------".repeat(item.level)+item.name}}
            </Option>
          </Select>
        </Form-item>
        <Form-item label="权限名称:" prop="name">
          <Input type="text" v-model="form.name" icon="ios-bolt"></Input>
        </Form-item>
        <Form-item label="对应规则:" prop="rule">
          <Input type="text" v-model="form.rule" icon="shuffle"></Input>
        </Form-item>
        <Form-item label="对应路由:" prop="role">
          <Input type="text" v-model="form.role" icon="paper-airplane"></Input>
        </Form-item>
        <Form-item label="对应图标:" prop="icon">
          <Input type="text" v-model="form.icon" icon="navicon"></Input>
        </Form-item>
        <Form-item label="是否启用:" prop="status">
          <Radio-group v-model="form.status">
            <Radio label=1>
              <Icon type="android-open"></Icon>
              <span>启用</span>
            </Radio>
            <Radio label=0>
              <Icon type="close-circled"></Icon>
              <span>禁用</span>
            </Radio>
          </Radio-group>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="ghost" style="margin-left: 8px" @click="remove">取消</Button>
        <Button type="primary"  :loading="modal_loading" @click="Ok">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
    export default{
      data() {
        return {
          authrulesave: false,
          maskClosable: false,
          modal_loading: false,
          closable: false,
          ruleCustom: {
            name: [
              {required: true, message: '请输入权限名称', trigger: 'blur'}
            ],
            rule: [
              {required: true, message: '请输入对应规则', trigger: 'blur'}
            ],
            role: [
              {required: true, message: '请输入对应路由', trigger: 'blur'}
            ],
            icon: [
              {required: true, message: '请填写图标', trigger: 'blur'}
            ]
          }
        }
      },
      props: {
        form: {
          default: Object
        },
        authlist: {
          default: Object
        }
      },
      methods: {
        // 关闭弹窗
        remove() {
          this.authrulesave = false
        },
        // 点击修改
        Ok() {
          this.$refs.formCustom.validate((valid) => {
            if (valid) {
              let id = this.form.id
              let data = this.form
              this.$http.put(this.$config.domain + 'authRule/base/' + id, data, (response) => {
                this.authrulesave = false
                this.$parent.index()
              })
            }
          })
        }
      }
    }
</script>
