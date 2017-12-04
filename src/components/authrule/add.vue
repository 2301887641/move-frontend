<template>
  <div>
    <Modal
      v-model="authruleadd"
      :mask-closable="maskClosable"
      :closable="closable">
      <p slot="header">
        <i class="fa fa-product-hunt" aria-hidden="true"></i>&nbsp;<span>添加权限</span>
      </p>
      <Form ref="formCustom" :model="form" :rules="ruleCustom" :label-width="80">
        <Form-item label="上级权限:" prop="parent_id">
          <Select v-model="form.parent_id" style="width:200px">
            <Option :value="0">顶级权限</Option>
            <Option v-for="item in authlist" :value="item.id" :key="item.name">{{"------".repeat(item.level)+item.name}}</Option>
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
        <Button type="primary"  :loading="modal_loading" @click="addOk">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data() {
        return {
          authruleadd: false,
          maskClosable: false,
          closable: false,
          modal_loading: false,
          form: {
            name: '',
            rule: '',
            role: '',
            status: 1,
            parent_id: 0,
            icon: ''
          },
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
        authlist: {
        }
      },
      methods: {
        // 取消操作
        remove() {
          this.$refs.formCustom.resetFields()
          this.authruleadd = false
        },
        // 保存操作
        addOk() {
          this.$refs.formCustom.validate((valid) => {
            if (valid) {
              this.$http.post(this.$config.domain + 'authRule/base', this.form, (response) => {
                this.authruleadd = false
                this.$refs.formCustom.resetFields()
                this.$parent.index()
              })
            }
          })
        }
      }
    }
</script>
