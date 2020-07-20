<template>
  <el-container>
    <el-card class="box-card">
      <el-button type="primary" @click="showDiolog('add')">添加分类</el-button>
    <el-table
      :data="categoryList"
      style="width: 100%;margin-top: 20px;"
      border>
      <el-table-column
        type='index'
        label="#"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="id"
        label="分类ID"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="src"
        label="路由地址"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="ename"
        label="英文名称"
        align='center'>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width='150px'>
        <template v-slot='scope'>
          <el-button style='padding: 5px;'type="warning" @click="showDiolog('edit', scope.row.id)">更改</el-button>
          <el-button style='padding: 5px;' type="danger" @click='toDeleteCategory(scope.row.id)'>删除</el-button>        
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="diologTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="categoryData" class="demo-form-inline" label-width='80px' ref='form' :rules='rules'>
        <el-form-item label="分类ID">
          <el-input v-model="categoryData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop='name'>
          <el-input v-model="categoryData.name"></el-input>
        </el-form-item>
        <el-form-item label="路由地址" prop='src'>
          <el-input v-model="categoryData.src"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop='ename'>
          <el-input v-model="categoryData.ename"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    </el-card>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      categoryList: [],
      dialogVisible: false,
      diologTitle: '',
      categoryData: {
        name: '',
        id: '',
        src: '',
        ename: ''
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }],
        src: [
          { required: true, message: '不能为空', trigger: 'blur' }],
        ename: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]
      }
    }
  },
  created: function () {
    this.getCategory()
  },
  methods: {
    getCategory: async function () {
      const data = await this.$http.get('/categoryList')
      this.categoryList = data.data
      console.log(this.categoryList)
    },
    getCategoryById: async function (id) {
      const data = await this.$http.get('/categoryById/' + id)
      this.categoryData = data.data[0]
      console.log(this.categoryData)
    },
    clearCategoryData: function () {
      this.categoryData = {
        name: '',
        id: '',
        src: '',
        ename: ''
      }
    },
    addCategory: async function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.dialogVisible = false
          const data = await this.$http.post('/addCategory', this.categoryData)
          if(data.data.addCategoryFlag) {
            this.getCategory()
            this.$message({
              message: '添加分类成功',
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
    editCategory: async function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.dialogVisible = false
          const data = await this.$http.put('/editCategory', this.categoryData)
          if(data.data.editCategoryFlag) {
            this.getCategory()
            this.$message({
              message: '编辑分类成功',
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
    deleteCategory: async function (id) {
      const data = await this.$http.delete('/deleteCategory/' + id)
      console.log(data)
      if(data.data.deleteCategoryFlag) {
        this.getCategory()
        this.$message({
          message: '删除分类成功',
          center: true,
          type: 'success'
        })
      }
    },
    showDiolog: function (val,id) {
      this.clearCategoryData()
      if (val === 'add') {
        this.diologTitle = '添加分类'
      }
      if (val === 'edit') {
        this.diologTitle = '编辑分类'
        this.getCategoryById(id)
      }
      this.dialogVisible = true
    },
    onSubmit: function () {
      if (this.diologTitle === '添加分类') {
        this.addCategory()
      }
      if (this.diologTitle === '编辑分类') {
        this.editCategory()
      }
    },
    toDeleteCategory: async function (id) {
      const data = await this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if(data === 'confirm') this.deleteCategory(id)
      console.log(id)
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
