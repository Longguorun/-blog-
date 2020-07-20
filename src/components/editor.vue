<template>
	<mavon-editor class='mavon-editor' :value="content" ref='md' @imgAdd="$imgAdd"  @imgDel="$imgDel" @change='changeEditorData'>
  </mavon-editor>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['content'],
  computed: {
    ...mapState(['editorData'])
  },
  data: function () {
    return {
      imageUrl: '',
      domain: 'https://upload-z2.qiniup.com',
      qiniuaddr: 'qdg8er2gb.bkt.clouddn.com'
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
