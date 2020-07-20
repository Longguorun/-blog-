<template>
	<mavon-editor class='mavon-editor' :value="editorData" ref='md' @imgAdd="$imgAdd"  @imgDel="$imgDel" @change='changeEditorData':subfield='false' style='min-height: 100px;width: 100%;' :toolbars='toolbars' :autofocus='false'>
  </mavon-editor>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['editorData'])
  },
  data: function () {
    return {
      imageUrl: '',
      domain: 'https://upload-z2.qiniup.com',
      qiniuaddr: 'qdg8er2gb.bkt.clouddn.com',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        // mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        htmlcode: true, // 展示html源码
        help: true, // 帮助
      }
    }
  },
  methods: {
    ...mapMutations(['changeEditorData']),
    $imgAdd: async function (pos, $file) {
      let filetype = ''
      if ($file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      console.log(pos, $file)
      const token = await this.$http.get('/token')
      console.log('token',token)
      const keyName = 'dZone' + Date.now() + Math.floor(Math.random() * 100) + '.' + filetype
      const formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('token', token.data)
      formdata.append('key', keyName)
      console.log(formdata)
      const returnData = await this.$http.post(this.domain, formdata, config)
      console.log(returnData)
      let url = 'http://' + this.qiniuaddr + '/' + returnData.data.key
      this.$refs.md.$img2Url(pos, url)
    },
    $imgDel(pos){
      delete this.img_file[pos]
    },
  }
}
</script>

<style  lang="less" scoped>
</style>
