<template>
  <el-container>
      <el-form ref="form" :model="blogData" label-width="50px" :rules='rules'>
        <div class="normalStatusBox">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label='标题' prop='title'>
                <el-input v-model="blogData.title" placeholder="输入博客的标题"></el-input>
              </el-form-item>            
            </el-col>
            <el-col :span="2">
              <el-form-item label='原创'>
                <el-checkbox :value="booleanOriginal" @change='changeOriginal'></el-checkbox>
              </el-form-item>           
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label='分类' prop='category_name'>
                <el-select v-model="blogData.category_name" placeholder="请选择">
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value='item.name'>
                  </el-option>
                </el-select>
              </el-form-item>          
            </el-col>
            <el-col :span="8">
              <el-form-item label='链接'>
                <el-input v-model="blogData.url" placeholder="输入链接地址" :disabled='Boolean(blogData.original)'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item style='text-align: right;'>
                <el-button type="primary" @click="onSubmit">立即发布</el-button>
                <el-button>取消</el-button>
              </el-form-item>           
            </el-col>
          </el-row>
        </div>
        <editor :content='blogData.content'></editor>
      </el-form>
  </el-container>
</template>

<script>
import editor from '../editor.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['editorData']),
    booleanOriginal: function () {
      return Boolean(this.blogData.original)
    }
  },
  components: {
    'editor': editor
  },
  props: ['id'],
  data: function () {
    return {
      categoryList: [],
      blogData: {
      },
      rules: {
        title: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 30 个字符', trigger: 'blur' }],
        category_name: [
          { required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created: function () {
    this.getBlog(this.id)
    this.getCategoryList()
  },
  methods: {
    ...mapMutations(['changeEditorData']),
    getCategoryList: async function () {
      const data = await this.$http.get('/categoryList')
      this.categoryList = data.data
      console.log(this.categoryList)
    },
    getBlog: async function (id) {
      const data = await this.$http.get('/getBLogContent/' + id)
      this.blogData = data.data[0]
      console.log(this.blogData)
    },
    uploadBlog: async function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = await this.$http.put('/editBlog', this.blogData)
          if(data.data.editBlogFlag) {
            this.blogData = {}
            this.changeEditorData('')
            this.$message({
              message: '博客更新成功',
              center: true,
              type: 'success'
            })
          }
          console.log(data)
        } else {
          console.log('error submit!!')
          return false       
        }
      })
    },
    changeOriginal: function () {
      this.blogData.original = !this.blogData.original
    },
    onSubmit: function () {
      this.blogData.content = this.editorData
      // this.form.date = Date.now()
      console.log(this.form)
      this.uploadBlog()
    }
  }
}
</script>

<style  lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-form {
    overflow: auto;
    width: 100%;
    .normalStatusBox {
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;
    }
    .mavon-editor {
      min-height: 600px;
    }
  }
}
</style>
