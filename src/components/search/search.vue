<template>
  <div class="search-component">
    <div class="search">
      <span class="date-text"><el-button>日期范围</el-button></span><span class="date-wrapper"><el-date-picker v-model="value1" type="date" placeholder="选择起始日期" :picker-options="pickerOptions0"></el-date-picker></span>
      <el-date-picker v-model="value1" type="date" placeholder="选择结束日期" :picker-options="pickerOptions0"></el-date-picker>
      <span class="search-text"><Input v-model="value" size="large" placeholder="请输入..." style="width: 300px"></Input></span>
      <span class="search-button"><Button type="primary" size="large" icon="ios-search" @click="search">搜索</Button></span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
      methods: {
        search() {
            this.$parent.search(1, 2, '222')
        }
      }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .search-component
    height: 70px
    line-height:70px
    text-align:center
    .search
      .date-text
        button
          border-radius:4px 0 0 4px
          border-right:none
      .date-wrapper
        input
          border-radius:0 4px 4px 0
      .search-text
        input
          position:relative
          bottom:2px
      .search-button
        button
          position:relative
          bottom:2px
</style>
