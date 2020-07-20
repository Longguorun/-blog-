<template>
  <el-container>
    <el-row id='row'>
      <el-col id='col' :xs="24" :sm="20" :md="20" :lg="18" :xl="16">
        <el-card class="box-card">
          <el-form ref="form" :model="form" :rules='rules'>
            <div class="formBox" style="margin-bottom: 10px;">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style='height: 60px;'>
                  <div class="headChooseBox" style="padding: 0 0px 0 0px;height: 100%;position: relative;">
                    <img :src="form.head" width="40px;" style="padding: 0 0px;float: left;">
                    <el-select v-model="form.head" placeholder="选择头像" style='width: 60%;'>
                      <el-option
                        v-for="item in headOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>                      
                  </div>                  
                </el-col>
                <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" style='height: 40px;'>
                  <el-form-item class='usernameInput' style='display: inline-block;width: 100%;' prop='username'>
                    <el-input style=';padding: 0 0 0 0px;box-sizing: border-box;'
                    placeholder='输入昵称' v-model='form.username' :disabled='hide'>
                      <template slot="prepend"><i class="el-icon-user-solid"></i></template>
                    </el-input>
                  </el-form-item>                  
                </el-col>                
                <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" style='height: 40px;'>
                  <el-form-item class='hideNameSwitch' style='display: inline-block;'>
                    <el-checkbox style='padding:0 0 0 0px;box-sizing: border-box;padding-left: 5px;' v-model='hide' @change='changeHideStatus'>匿名</el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" style='height: 40px;'>
                  <el-form-item class='hideNameSwitch' style='display: inline-block;width: 100%;' prop='url'>
                    <el-input style='padding: 0 0 0 0px;' placeholder='输入URL' v-model='form.url' :disabled='hide'>
                      <template slot="prepend"><i class="el-icon-paperclip"></i></template>
                    </el-input>
                  </el-form-item>                  
                </el-col>
              </el-row>
         <!--      <div class='normalFormItem'>
              </div> -->              
            </div>
            <el-form-item style='padding: 0;margin: 0px;'>
              <editor-comments></editor-comments>
            </el-form-item>
            <el-form-item style='padding: 0;margin-top:10px;'>
            <div class="commnetsTotal" style="float:left;margin: 0;"> {{commentsNum}} 条评论</div>
              <el-button type="primary" @click="onSubmitCommit" style='float: right;padding: 10px 10px;'>发表评论</el-button>
            </el-form-item>    
          </el-form>
          <blog-commnet-box v-for='item in blogCommentsDataFilter' :key='item.id' :data='item'
          class='blog-commnet-box' style='width: 100%;'>
          </blog-commnet-box>
          <div class="paginationBlock" style="text-align: center;margin-top: 20px;">
            <el-pagination
              :page-sizes="[5, 10, 15, 20]"
              :page-size="currentPageSize"
              :current-page="currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="sizes, prev, next, jumper"
              :total="commentsNum"
              style='font-size: 10px;'
              class="hidden-xs-only">
            </el-pagination>
            <el-pagination
              :page-sizes="[5, 10, 15, 20]"
              :page-size="currentPageSize"
              :current-page="currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="sizes, prev, next"
              :total="commentsNum"
              style='font-size: 10px;'
              class="hidden-sm-and-up">
            </el-pagination>
          </div>
        <div class="footer">
            <span>2020 © Powered by</span>
            <el-divider direction="vertical"></el-divider>
            <router-link :to="{path:'/about'}">dZone</router-link>
            <el-divider direction="vertical"></el-divider>
            <span>川ICP备15032882号</a></span>
        </div>
        <!-- </div> -->
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import editorComments from './editor-comments.vue'
import blogCommentBox from '../components/blogCommentBox.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  data: function () {
    return {
      currentPageSize: 10,
      currentPage: 1,
      form: {
        username: '',
        url: '',
        head: 'http://qdg8er2gb.bkt.clouddn.com/dZone159506195699470.jpg',
        content: '',
        blogId: this.id,
        parentId: null,
        date: ''
      },
      hide: false,
      blogCommentsData: [],
      headOptions: [{
        label: '小白',
        value: 'http://qdg8er2gb.bkt.clouddn.com/dZone159506202813834.jpg'
      }, {
        label: '小新',
        value: 'http://qdg8er2gb.bkt.clouddn.com/dZone159506195699470.jpg'
      }, {
        label: '小猪',
        value: 'http://qdg8er2gb.bkt.clouddn.com/dZone159506209382083.jpg'
      }, {
        label: '小天',
        value: 'http://qdg8er2gb.bkt.clouddn.com/dZone159506211037970.jpg'
      }],
      rules: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }],
        url: [
          { type: 'url', message: '请输入网址', trigger: 'blur'}]
      }
    }
  },
  computed: {
    ...mapState(['editorData']),
    commentsNum: function () {
      return this.blogCommentsData.length
    },
    blogCommentsDataFilter: function () {
      let min = (this.currentPage - 1) * this.currentPageSize
      let max = (this.currentPage * this.currentPageSize)
      return this.blogCommentsData.slice(min, max)
    }
  },
  created: function () {
    this.getComments()
  },
  methods: {
    ...mapMutations(['changeEditorData']),
    changeHideStatus: function (val) {
      if (val === true) {
        this.form.username = '匿名'        
      } else {
        this.form.username = ''
      }
    },
    getComments: async function () {
      const data = await this.$http.get('/getComments')
      this.blogCommentsData = data.data
      console.log(this.blogCommentsData)
    },
    success: function (val) {
      this.$message({
        showClose: true,
        message: val,
        type: 'success'
      })
    },
    onSubmitCommit: async function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.form.date = Date.now()
          this.form.content = this.editorData
          console.log(this.form)
          const data = await this.$http.post('/uploadComment', this.form)
          if(data.data.uploadCommentFlag) {
          this.success('评论成功！')
          this.changeEditorData('')
          this.form = {
              username: '',
              url: '',
              head: 'http://qdg8er2gb.bkt.clouddn.com/dZone159506195699470.jpg',
              content: '',
              blogId: this.id,
              parentId: null,
              date: ''
            }
            this.getComments(this.id)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange: function (size) {
      this.currentPageSize = size
    },
    handleCurrentChange: function (page) {
      this.currentPage = page
    }
  },
  components: {
    'blog-commnet-box': blogCommentBox,
    'editor-comments': editorComments
  }
}
</script>

<style  lang="less" scoped>
.el-container {
    background-color: #f3f3f4;
    position: relative;
    height: 100%;
    overflow: auto;
    #row {
      width: 100%;
      position: relative;
      #col {
        height: 100%;
        position: absolute;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        > .el-card {
          box-sizing: border-box;
          padding: 5px;
          .footer {
            height: 40px;
            width: 100%;
            text-align: center;
            font-size: 14px;
            padding: 26px 0 0 0;
            box-sizing: border-box;
            a {
              text-decoration: none;
            }
          }
        }       
      }
    }
    .commnetsTotal {
      font-size: 16px;
      margin: 15px 10px;
    }
    .formBox {
      display: flex;
      margin-top: 5px;
      .headChooseBox {
        // width: 180px;
        height: 40px;
        // margin-right: 10px;
        img {
          float: left;
          margin-right: 10px;
        }
        .el-select {
          float: left;
          // width: 120px;
          height: 40px;
          font-size: 12px;
        }
      }
      .normalFormItem {
        flex: 1;
      }
    }
}
</style>
