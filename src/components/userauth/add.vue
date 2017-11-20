<template>
    <div>
      <Modal
        v-model="userauthadd"
        :mask-closable="maskClosable"
        :closable="closable"
      >
      <p slot="header">
        <i class="fa fa-product-hunt" aria-hidden="true"></i> <span>添加用户组认证</span>
      </p>
        <Form ref="formCustom" :model="form" :rules="ruleCustom" :label-width="80">
          <Form-item label="用户:" prop="parent_id">
            <Select v-model="form.parent_id" style="width:200px">
              <Option :value="0">顶级权限</Option>
              <Option v-for="item in authlist" :value="item.id" :key="item.name">{{"------".repeat(item.level)+item.name}}</Option>
            </Select>
          </Form-item>
        </Form>
      </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        userauthadd: false,
        maskClosable: false,
        closable: false,
        form: {
          uid: 0,
          group_id: 0
        }
      }
    },
    methods: {

    }
  }
</script>
