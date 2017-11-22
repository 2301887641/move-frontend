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
          <Form-item label="用户:" prop="uid">
            <Select v-model="form.uid" style="width:200px">
              <Option v-for="item in userList" :value="item.id" :key="item.text">{{item.text}}</Option>
            </Select>
          </Form-item>
          <Form-item label="角色:" prop="group_id">
            <Select v-model="form.group_id" style="width:200px">
              <Option v-for="item in authGroup" :value="item.id" :key="item.text">{{item.text}}</Option>
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
        },
        ruleCustom: {
        }
      }
    },
    methods: {

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
