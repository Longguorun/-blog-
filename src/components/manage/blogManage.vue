<template>
  <el-container>
    <el-card class="box-card">
    <el-table
      :data="blogs"
      style="width: 100%"
      border>
      <el-table-column
        type='index'
        label="#"
        align='center'>
      </el-table-column>
      <el-table-column
        label="ID"
        prop='id'
        align='center'
        width='50px'>
      </el-table-column>
      <el-table-column
        label="标题"
        prop='title'
        align='center'
        width='300px'>
      </el-table-column>
      <el-table-column
        label="原创"
        prop='original'
        align='center'
        width='50px'>
      </el-table-column>
      <el-table-column
        label="分类名"
        prop='category_name'
        align='center'>
      </el-table-column>
      <el-table-column
        label="分类名英文"
        prop='category_ename'
        align='center'>
      </el-table-column>
      <el-table-column
        label="链接"
        prop='url'
        align='center'>
      </el-table-column>
      <el-table-column
        label="发表时间"
        prop='date'
        align='center'>
      </el-table-column>
      <el-table-column
        label="评论数量"
        prop='commentsNum'
        align='center'
        width='50px'>
      </el-table-column>
      <el-table-column
        label="浏览数量"
        prop='viewsNum'
        align='center'
        width='50px'>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width='200px'>
        <template v-slot='scope'>
          <el-button  style='padding: 5px;' type="warning" @click="editBlog(scope.row.id)">编辑</el-button>
          <el-button style='padding: 5px;' type="danger" @click='toDeleteBlog(scope.row.id)'>删除</el-button>
          <el-button style='padding: 5px;' type="success" @click='blogCommentsManage(scope.row.id)'>评论管理</el-button>       
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      blogs: []
    }
  },
  created: function () {
    this.getBlogsAll()
  },
  methods: {
    getBlogsAll: async function () {
      const data = await this.$http.get('/blogsAll')
      console.log(data)
      this.blogs = data.data
    },
    editBlog: function (id) {
      this.$router.push('/editBlog/' + id)
    },
    deleteBlog: async function (id) {
      const data = await this.$http.delete('/deleteBlog/' + id)
      console.log(data)
      if (data.data.deleteBlogFlag) {
        this.getBlogsAll()
        this.$message({
          message: '删除Blog成功',
          type: 'success',
          center: true
        })
      }
    },
    toDeleteBlog: async function (id) {
      const data = await this.$confirm('此操作将删除该Blog, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if(data === 'confirm') this.deleteBlog(id)
    },
    blogCommentsManage: function (id) {
      this.$router.push('/blogCommentsManage/' + id)
    }
  }
}
</script>

<style  lang="less" scoped>
.el-container {
  width: 100%;
  .el-card {
    width: 100%;
  }
}
</style>
