<template>
  <el-container>
    <div class="box">
      <el-form ref="form" :model="form" label-position='top' :rules='rules'>
        <el-form-item label="账号">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop='oldPassword'>
          <el-input v-model="form.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="输入新密码" prop='newPassword1'>
          <el-input v-model="form.newPassword1" show-password></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop='newPassword1'>
          <el-input v-model="form.newPassword2" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='toChangePassword'>确认更改</el-button>
        </el-form-item>
      </el-form>      
    </div>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        username: 'admin',
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
        newPassword1: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
        newPassword2: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    action: function (val1, val2) {
        this.$message({
          message: val1,
          type: val2,
          center: true
        })
    },
    clearForm: function () {
      this.form = {
        username: 'admin',
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      }
    },
    changePassword: async function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = await this.$http.put('/changePassword', this.form)
          console.log(data)
          if(data.data.changePasswordFlag) {
            this.action('密码更改成功！', 'success')
            this.clearForm()
          } else {
            this.action('密码输入错误！' ,'error')
          }
        } else {
          console.log('error submit!!')
          return false   
        }
      })
    },
    toChangePassword: async function () {
      const data = await this.$confirm('此操作将更改账号密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if(data === 'confirm') {
        console.log(this.form)
        this.changePassword()
      }
    }
  }
}
</script>

<style  lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  position: relative;
  .box {
    width: 300px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
  }  
}
</style>
