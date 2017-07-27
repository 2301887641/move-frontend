<template>
  <div>
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }"><i class="fa fa-home" aria-hidden="true"></i> 首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{oneInfo}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{twoInfo}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          oneInfo: {
              type: String
          },
          twoInfo: {
              type: String
          }
      }

  }

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .nav .el-breadcrumb
    line-height:70px
    font-size:17px
    border-bottom:1px solid #e5e5e5
    padding-left:30px
    box-sizing:border-box
</style>
