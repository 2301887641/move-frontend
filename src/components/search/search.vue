<template>
  <div class="search-component">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="2" :offset="5"><span>日期范围:</span></el-col>
        <el-col :span="3">
          <el-date-picker
            v-model="date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input v-model="content" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <Button type="primary" icon="ios-search" @click="search">搜索</Button>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
     data() {
       return {
         date: '',
         content: ''
       }
     },
      methods: {
        search() {
          let startTime = 0
          let endTime = 0
          if (this.date && (this.date.length >= 2)) {
            startTime = this.date[0]
            endTime = this.date[1]
          }
            this.$parent.search(startTime, endTime, this.content)
        }
      }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .search-component
    height: 70px
    line-height:70px
    text-align:center
</style>
