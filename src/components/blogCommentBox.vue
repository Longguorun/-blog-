<template>
<!--   <div class="box">
    <el-avatar :size="40" :src="data.head"></el-avatar>
    <div class='commentsBox' style="display: flex; padding: 5px 0">
      <el-card style='flex: 1; min-height: 20px;'>
        <div slot="header" class="clearfix">
          <div style="float: left;width: 120px;">
            <a v-if='data.url' :href='data.url' style="margin-right: 15px;color: #  ca6006;font-size: 18px;text-decoration: none;">{{data.username}}</a>
            <span v-else style="margin-right: 15px;color: #65666a;font-size: 18px;">{{data.username}}</span>            
          </div>
          <span style="font-size: 14px;color: blue;">{{data.date | dateFormat}}</span>
          <span style="float: right;margin-right: 10px;
          font-size: 12px;color: rgb(107, 108, 111)">#{{data.index}}</span>
        </div>
        <mavon-editor
        class="md comments-mavon-editor"
        :value="data.content"
        :subfield = "false"
        defaultOpen = "preview"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="false"
        :boxShadow='false'
        previewBackground='#fff'
        :imageClick='imageClick'
        style='border: none;'
        :autofocus='false'>
        </mavon-editor>
      </el-card>
    </div>
  </div> -->
  <div class="box" style='width: 100%;'>
    <div class='commentsBox' style="padding: 5px 0;float: left;width: 100%;box-sizing: border-box;">
      <el-card style='min-height: 20px;'>
        <div slot="header" class="clearfix" style="height: 30px;">
          <img :src="data.head" width="35px" height="35px" style="float: left; margin-right: 10px;">
          <div style="float: left;position: relative;">
            <div v-if='data.url' style="margin-right: 15px;color: #ca6006;font-size: 18px;text-decoration: none;"><a :href='data.url' >{{data.username}}</a></div>
            <div v-else style="margin-right: 15px;color: #65666a;font-size: 18px;">{{data.username}}</div>            
            <div style="font-size: 10px;color: #65666a;">{{data.date | dateFormat}}</div>
          </div>
          <span style="float: right;margin-right: 10px;
          font-size: 10px;color: rgb(107, 108, 111)">#{{data.index}}</span>
        </div>
        <mavon-editor
        class="md comments-mavon-editor"
        :value="data.content"
        :subfield = "false"
        defaultOpen = "preview"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="false"
        :boxShadow='false'
        previewBackground='#fff'
        :imageClick='imageClick'
        style='border: none;'
        :autofocus='false'>
        </mavon-editor>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentsBox',
  data: function () {
    return {
    }
  },
  props: ['data'],
  methods: {
    imageClick: function () {
    }
  }
}
</script>

<style  lang="less" scoped>
.box {
  width: 100%;
  display: flex;
  .el-avatar {
    width: 50px;
    margin: 15px 10px 0 0;
  }
  .commentsBox{
    flex: 1;
    .comments-mavon-editor {
      min-height: 0px !important;
      overflow: none;
    }
  }
}

</style>
