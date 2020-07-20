<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avatar-box">
                <img src="../assets/logo.jpg">
            </div>
            <el-form label-width="0px" class='form' :model="login_form" :rules="rules" ref='loginFormRef'>
                <el-form-item label="" class='inputText username' prop="username">
                    <el-input prefix-icon="el-icon-user" v-model='login_form.username' disabled></el-input>
                </el-form-item>
                <el-form-item label="" class='inputText password' prop="password">
                    <el-input type='password' prefix-icon="el-icon-lock" v-model='login_form.password'></el-input>
                </el-form-item>
                <el-form-item class='buttons'>
                      <el-button type="success" round class='login' @click='login'>登陆</el-button>
                      <el-button type="info" round class='reset' @click='resetForm'>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      login_form: {
        username: 'admin',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm: function () {
      this.$refs.loginFormRef.resetFields()
      this.login_form = {
        username: '',
        password: ''
      }
    },
    login: async function () {
      const data = await this.$http.post('/login', this.login_form)
      console.log(data)
      if (data.data.loginSuccess) {
        this.$message({
          message: '登录成功',
          type: 'success',
          center: true
        })
        this.$router.push('/manage')
      } else {
        this.$message({
          message: '账号或密码错误',
          type: 'error',
          center: true
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
    height: 100%;
    background-color: #2b4b6b;
    position: relative;
    .login-box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .avatar-box {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-60%);
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid #eee;
                box-shadow:  0 0 10px #ddd;
                background-color: #fff;
                padding: 10px;
            }
        };
        .form {
            height: 220px;
            width: 100%;
            position: absolute;
            bottom: 0;
            padding: 10px 50px;
            box-sizing: border-box;
            .buttons {
                display: flex;
                justify-content: flex-end;
                .login {
                    margin: 0 10px;
                };
                .reset {
                    margin: 0 10px;
                }
            }
        }
    }
}
</style>
