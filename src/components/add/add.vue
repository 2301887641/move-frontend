<template>
  <div class="add-component">
    <div class="action">
      <span>
        <el-button type="danger"><i class="el-icon-delete2"></i>&nbsp;批量删除</el-button>
        <el-button type="primary"><i class="el-icon-plus"></i>&nbsp;添加</el-button>
      </span>
      <span class="count">
        共有数据：{{count}} 条
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      count: {
        type: Number,
        default: 0
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .add-component
    .action
      width:97%
      margin:0 auto
      padding:10px 0 10px 5px
      box-sizing:border-box
      background:#f5fafe
      display:flex
      justify-content: space-between
      .count
         margin-right:50px
         font-size:17px
         line-height:36px
         font-weight:bolder
</style>
