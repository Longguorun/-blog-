<template>
  <div>
    <div class='commentsBox' style="display: flex; padding: 10px 10px 10px 0">
      <div style="margin-right: 20px">
        <el-avatar shape="square" :size="60" :src="data.headSrc"
        style='padding: 1.8px;background-color: #e3e4e4'></el-avatar>    
      </div>
      <el-card style='flex: 1; min-height: 100px;'>
        <div slot="header" class="clearfix">
          <span>{{data.author}} </span>
          <span>{{data.commitDate}}</span>
        </div>
        <div class="text item" v-html='data.details'>
        </div>
      </el-card>
    </div>
    <el-divider></el-divider>    
  </div>
</template>

<script>
export default {
  name: 'commentsBox',
  data: function () {
    return {
    }
  },
  props: ['data']
}
</script>

<style  lang="less" scoped>
</style>
