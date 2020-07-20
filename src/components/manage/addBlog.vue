<template>
  <el-container>
    <el-form ref="form" :model="form" label-width="50px":rules='rules'>
      <div class="normalStatusBox">
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label='标题' prop='title'>
              <el-input v-model="form.title" placeholder="输入博客的标题"></el-input>
            </el-form-item>            
          </el-col>
          <el-col :span="2">
            <el-form-item label='原创'>
              <el-checkbox v-model="form.original"></el-checkbox>
            </el-form-item>           
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label='分类' prop='category_name'>
              <el-select v-model="form.category_ename" placeholder="请选择">
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value='item.ename'>
                </el-option>
              </el-select>
            </el-form-item>          
          </el-col>
          <el-col :span="12">
            <el-form-item style='text-align: right;'>
              <el-button type="primary" @click="onSubmit">立即发布</el-button>
              <el-button>取消</el-button>
            </el-form-item>           
          </el-col>
        </el-row>
      </div>
      <editor :content='form.content'></editor>
    </el-form>
  </el-container>
</template>

<script>
import editor from '../editor.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['editorData'])
  },
  components: {
    'editor': editor
  },
	data: function () {
    return {
      form: {
        title: '',
        original: true,
        category_name: '',
        content: '',
        date: ''
      },
      categoryList: [],
      rules: {
        title: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }],
        category_name: [
          { required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created: function () {
    this.getCategoryList()
  },
  methods: {
    ...mapMutations(['changeEditorData']),
    getCategoryList: async function () {
      const data = await this.$http.get('/categoryList')
      this.categoryList = data.data
      console.log(this.categoryList)
    },
    uploadBlog: async function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = await this.$http.post('/uploadBlog', this.form)
          if(data.data.uploadBlogFlag) {
            this.form = {
              title: '',
              original: true,
              category_name: '',
              content: '',
              date: ''
            }
            this.changeEditorData('')
            this.$message({
              message: 'Blog发表成功',
              type: 'success',
              center: true
            })
          }
          console.log(data)
        } else {
          console.log('error submit!!')
          return false    
        }
      })
    },
    onSubmit: function () {
      this.form.date = Date.now()
      this.form.content = this.editorData
      for(let key in this.categoryList) {
        if(this.form.category_ename === this.categoryList[key].ename) {
          this.form.category_name = this.categoryList[key].name
          break
        }
      }
      console.log(this.form)
      this.uploadBlog()
    }
  }
}
</script>

<style  lang="less" scoped>
.el-container {
  width: 100%;
  .el-form {
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
