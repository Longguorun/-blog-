<template>
  <el-container>
    <el-card class="box-card">
    <el-table
      :data="commentsData"
      style="width: 100%"
      border>
      <el-table-column
        type='index'
        label="#"
        align='center'>
      </el-table-column>
      <el-table-column
        label="ID"
        prop='commentId'
        align='center'
        width='50px'>
      </el-table-column>
      <el-table-column
        label="用户名"
        prop='username'
        align='center'
        width='100px'>
      </el-table-column>
      <el-table-column
        label="头像"
        prop='head'
        align='center'>
      </el-table-column>
      <el-table-column
        label="链接"
        prop='url'
        align='center'>
      </el-table-column>
      <el-table-column
        label="内容"
        prop='content'
        align='center'>
      </el-table-column>
      <el-table-column
        label="发表时间"
        prop='date'
        align='center'
        width='100px'>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width='150px'>
        <template v-slot='scope'>
          <el-button style='padding: 5px;' type="warning" @click="toEditComment(scope.row.commentId)">编辑</el-button>
          <el-button style='padding: 5px;' type="danger" @click='toDeleteComment(scope.row.commentId)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
    <el-dialog
      title="编辑评论"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="singleCommentData" class="demo-form-inline" label-width='80px' ref='form' :rules='rules'>
        <el-form-item label="评论ID">
          <el-input v-model="singleCommentData.commentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="singleCommentData.username"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop='head'>
          <el-input v-model="singleCommentData.head"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="singleCommentData.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      commentsData: [],
      dialogVisible: false,
      singleCommentData: {},
      rules: {
        username: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }],
        head: [
          { required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created: function () {
    this.getCommentsData()
  },
  methods: {
    getCommentsData: async function () {
      const data = await this.$http.get('/getComments')
      console.log(data)
      this.commentsData = data.data
    },
    getSingleCommentDataById: async function (id) {
      const data = await this.$http.get('/getSingleCommentDataById/' + id)
      this.singleCommentData = data.data[0]
      console.log(data)
    },
    toEditComment: function (id) {
      console.log(id)
      this.getSingleCommentDataById(id)
      this.dialogVisible = true
    },
    editComment: async function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.dialogVisible = false
          const data = await this.$http.put('/editComment', this.singleCommentData)
          console.log(data)
          if(data.data.editCommentFlag) {
            this.getCommentsData()
            this.$message({
              message: '更新评论成功',
              type: 'success',
              center: true
            })
          }
        } else {
          console.log('error submit!!')
          return false    
        }
      })
    },
    deleteComment: async function (id) {
      const data = await this.$http.delete('/deleteComment/' + id)
      if (data.data.deleteCommentFlag) {
        this.getCommentsData()
        this.$message({
          message: '删除评论成功',
          type: 'success',
          center: true
        })
      }
    },
    toDeleteComment: async function (id) {
      const data = await this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if(data === 'confirm') this.deleteComment(id)
    },
    onSubmit: function () {
      this.editComment()
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
