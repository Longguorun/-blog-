<template>
	<el-container>
    <el-row id='row'>
      <el-col id='col' :xs="24" :sm="20" :md="20" :lg="18" :xl="16">
        <div class="elCardBox">
          <el-card class="box-card">
            <!-- <h1 class="contentTtlte">{{blogContentData.title}}</h1> -->
            <mavon-editor
             class="md mavon-editor"
            :value="blogContentData.content"
            :subfield = "prop.subfield"
            :defaultOpen = "prop.defaultOpen"
            :toolbarsFlag = "prop.toolbarsFlag"
            :editable="prop.editable"
            :scrollStyle="prop.scrollStyle">
            </mavon-editor>
          </el-card>
          <div class="commnetsTotal"> {{blogNumCalculate}} 条评论</div>
          <el-card class="box-card">
            <el-form ref="form" :model="form" :rules="rules">
              <div class="formBox">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style='height: 60px;'>
                    <div class="headChooseBox" style="padding: 0 0px 0 0px;width: 60%;height: 100%;position: relative;margin-top: 10px;">
                      <img :src="form.head" width="40px;" style="padding: 0 0px;float: left;">
                      <el-select v-model="form.head" placeholder="选择头像" style='width: 100%;padding-left: 50px;box-sizing: border-box;position: absolute;right: 0;'>
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
              </div>
              <el-form-item style='padding: 0;margin-top: 10px;'>
                  <editor-comments></editor-comments>
              </el-form-item>
              <el-form-item style='padding: 0;margin-top:10px;'>
                <el-button type="primary" @click="onSubmitCommit" style='float: right;padding: 10px 10px;'>发表评论</el-button>
              </el-form-item>    
            </el-form>
            <blog-commnet-box v-for='item in blogCommentsDataFilter' :key='item.id' :data='item'
             class='blog-commnet-box'>
             </blog-commnet-box>
          <div class="paginationBlock" style="text-align: center;padding-top: 20px;">
            <el-pagination
              :page-sizes="[5, 10, 15, 20]"
              :page-size="currentPageSize"
              :current-page="currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="sizes, prev, next, jumper"
              :total="commentsNum"
              class='hidden-xs-only'>
            </el-pagination>
            <el-pagination
              :page-sizes="[5, 10, 15, 20]"
              :page-size="currentPageSize"
              :current-page="currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="sizes, prev, next"
              :total="commentsNum"
              class='hidden-sm-and-up'>
            </el-pagination>
          </div>
          </el-card>
          <div class="footer">
            <span>2020 © Powered by</span>
            <el-divider direction="vertical"></el-divider>
            <router-link :to="{path:'/about'}">dZone</router-link>
            <el-divider direction="vertical"></el-divider>
            <span>川ICP备15032882号</a></span>
          </div>
        </div>        
      </el-col>
    </el-row>
	</el-container>
</template>

<script>
import blogCommentBox from '../components/blogCommentBox.vue'
import editorComments from './editor-comments.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['id'],
  data: function () {
    return {
      currentPageSize: 10,
      currentPage: 1,
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
      blogContentData: {
        title: '',
        date: '',
        content: ''
      },
      blogCommentsData: [{
        id: '',
        name: '',
        date: '',
        content: '',
        head: ''
      }],
      value: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: false, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true // 导航目录
      },
      form: {
        username: '',
        url: '',
        head: 'http://qdg8er2gb.bkt.clouddn.com/dZone159506209382083.jpg',
        content: '',
        blogId: this.id,
        parentId: null,
        date: ''
      },
      hide: false,
      blogNum: 0,
      rules: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }],
        url: [
          { type: 'url', message: '请输入网址', trigger: 'blur'}]
      }
    }
  },
  created: function () {
    this.getBlogContent(this.id)
    this.getBlogComments(this.id)
  },
  methods: {
    ...mapMutations(['changeEditorData']),
    getBlogContent: async function (id) {
      console.log(id)
      const data = await this.$http.get('/getBLogContent/'+ id)
      this.blogContentData = data.data[0]
    },
    getBlogComments: async function (id) {
      const data = await this.$http.get('/getBlogComments/'+ id)
      this.blogCommentsData = data.data
      console.log(this.blogCommentsData)
    },
    saveData: function () {
      console.log(this.value)
    },
    changeHideStatus: function (val) {
      if (val === true) {
        this.form.username = '匿名'        
      } else {
        this.form.username = ''
      }
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
          const data = await this.$http.post('/uploadBlogComment', this.form)
          if(data.data.uploadBlogCommentFlag) {
            this.success('评论成功！')
            this.changeEditorData('')
          this.form = {
              username: '',
              url: '',
              head: 'http://qdg8er2gb.bkt.clouddn.com/dZone159506209382083.jpg',
              content: '',
              blogId: this.id,
              parentId: null,
              date: ''
            }
            this.getBlogComments(this.id)
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
  },
  computed: {
    commentsNum: function () {
      return this.blogCommentsData.length
    },
    blogCommentsDataFilter: function () {
      let min = (this.currentPage - 1) * this.currentPageSize
      let max = (this.currentPage * this.currentPageSize)
      return this.blogCommentsData.slice(min, max)
    },
    prop () {
      let data = {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
      }
      return data
    },
    blogNumCalculate () {
      return this.blogCommentsData.length
    },
    ...mapState(['editorData'])
  }
}
</script>

<style  lang="less" scoped>
.el-container {
  background-color: #f3f3f4;
  position: relative;
  height: 100%;
  overflow: auto;
  padding-top: 10px;
  width: 100%;
  #row {
    width: 100%;
    position: relative;
    #col {
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .elCardBox {
            width: 100%;
            > .el-card {
              box-sizing: border-box;
              width: 100%;
              // padding: 10px;
              &:first-child {
                .contentTtlte {
                  font-size: 24px;
                  text-align: center;
                  font-weight: 500px;
                  letter-spacing: 2px;
                  margin-bottom: 50px;
                }
                .mavon-editor {
                  font-size: 16px;
                }        
              }
              &:last-child {
                .blog-commnet-box {
                  margin-top: 20px;
                }
              }
            }
            .commnetsTotal {
              font-size: 16px;
              margin: 15px 10px;
            }
            .formBox {
              display: flex;
              .headChooseBox {
                width: 180px;
                height: 40px;
                margin-right: 10px;
                img {
                  float: left;
                  margin-right: 10px;
                }
                .el-select {
                  float: left;
                  width: 120px;
                  height: 40px;
                  font-size: 12px;
                }
              }
              .normalFormItem {
                flex: 1;
              }
            }
            .footer {
              height: 80px;
              width: 100%;
              text-align: center;
              font-size: 14px;
              padding: 33px 0;
              box-sizing: border-box;
              a {
                text-decoration: none;
              }
            }
      }      
    }
  }
    
}
</style>
