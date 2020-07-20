<template>
  <el-container>
    <el-aside class='hidden-xs-only' width='200px'>
      <el-menu
        :default-active="currentCategory"
        class="el-menu-vertical-demo"
        background-color='#f3f3f4'
        :border='false'
        @select='changeBlogCategory'>
        <el-menu-item  index="/all">
          <span>所有分类</span>
        </el-menu-item>
        <el-menu-item v-for='item in categoryList' :index="item.src">
          <span>{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="main-box">
        <div class="middle">
          <div class="searchBox" style="padding-top: 10px;">
            <div style="height: 30px;float: left;margin: 15px 0 0 20px;">
            <span style="font-size: 12px;">共 </span><span style="color:rgb(241, 102, 4);font-size:16px;">{{blogsNum}}</span><span style="font-size: 12px;"> 篇文章</span>
            </div>
            <el-input placeholder="输入关键字" v-model='key.keyWords' style='width:250px;float: right;'>
              <el-select slot="prepend" v-model='key.keyWordsType' style='width: 80px;'>
                <el-option label="标题" value="title"></el-option>
                <el-option label="全文" value="content"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" size='mini' @click='searchKeyWords'></el-button>
            </el-input>         
          </div>
          <ul>
            <li v-for='item in articleListFilter' :key='item.id'>
              <div class="contentBox">
                <div style="height: 30px;">
                  <div style="float: left;font-size: 14px; margin: 10px 0;">{{item.date | dateFormat}}</div>
                  <div style="float: right;font-size: 10px;color: rgb(107, 108, 111);">#{{item.index}}</div>
                </div>
                <div style="margin: 10px 0;">
                  <i class="el-icon-copy-document" v-if="item.original===0" style="margin: 0 4px;font-size: 22px;color: rgb(107, 120, 2)" title='非原创'></i>
                  <router-link :to="{ path: /blogcontent/+item.id, params: {idl:  item.id} }" style='text-decoration: none;font-size: 22px;'>{{item.title}}
                  </router-link>
                </div>
                <div style="height: 30px;">
                  <div style="float: left;font-size: 14px;height: 100%;">
                    <div style="float: left;height: 100%;line-height: 30px;width: 100px;">
                      <i class="el-icon-s-flag" style="color: red;margin: 0 3px"></i>
                      <a href="javascript:;" @click="changeBlogCategory('/'+item.category_ename)" style="text-decoration: none;color:rgb(107, 108, 111);">{{item.category_name}}</a>                     
                    </div>
                    <div style="float: left;height: 100%;line-height: 30px;width: 50px;">
                      <i class="el-icon-view" style="margin: 0 3px"></i>
                      <a href="javascript:;" style="text-decoration: none;color:rgb(107, 108, 111)">{{item.viewsNum}}</a>
                    </div>
                    <div style="float: left;height: 100%;line-height: 30px;width: 50px;">
                      <i class="el-icon-chat-dot-square" style="margin: 0 3px"></i>
                      <a href="javascript:;" style="text-decoration: none;color:rgb(107, 108, 111)">{{item.commentsNum}}</a>
                    </div>
                  </div>
                  <div style="float: right;font-size: 12px;" v-if='item.url' >
                    <i class="el-icon-paperclip"></i>
                    <span>{{item.url}}</span>
                  </div> 
                </div>
              </div>
            </li>
          </ul>
          <div class="paginationBlock" style="text-align: left;">
            <el-pagination
              :page-sizes="[5, 10, 15, 20]"
              :page-size="currentPageSize"
              :current-page="currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="sizes, prev, pager, next, jumper"
              :total="blogsNum"
              class=' hidden-xs-only'>
            </el-pagination>
            <el-pagination
              :page-sizes="[5, 10, 15, 20]"
              :page-size="currentPageSize"
              :current-page="currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="sizes, prev, next, jumper"
              :total="blogsNum"
              class='hidden-sm-and-up'>
            </el-pagination>
          </div>
        </div>
        <div class="rightSide hidden-sm-and-down">
          <el-card class="box-card about">
            <div slot="header" class="clearfix">
              <span><b>博客简介</b></span>
            </div>
            <div class="text item" style="line-height: 35px;letter-spacing: 1px;">
              <span style="color: blue;">dZone</span> 是一个基于Node.js开发的个人分享博客，采用Express + Vue作为前后端的开发工具
            </div>
          </el-card>
          <el-card class="box-card hotArticles">
            <div slot="header" class="clearfix">
              <span><b>热门文章</b></span>
            </div>
            <ul style="list-style-type: none;">
              <li v-for='(item,index) in hotBlogsFilter' :key='item.id' style="height: 35px;width: 100%;font-size: 12px;">
                <div style="float: left;line-height: 30px;margin-right: 10px;">{{index+1}}</div>
                <div style="float: left;width: 180px;overflow:hidden;text-overflow:ellipsis;">
                  <router-link :to="{ path: /blogcontent/+item.id, params: {idl:  item.id} }"
                  style='text-decoration: none;font-size: 16px;line-height: 30px;'>
                    <nobr>{{item.title}}</nobr>
                  </router-link>
                </div>
                <div style="float: right;line-height: 30px; width: 40px;">
                    <img src="../assets/hot.jpg" width="10px;" style="float: left;margin: 10px 5px;">
                    <span style="float: left;color: red;width: 20px;">{{item.hot}}</span>
                </div>
              </li>
            </ul> 
          </el-card>
        </div>
        <div class="footer">
          <span>2020 © Powered by</span>
          <el-divider direction="vertical"></el-divider>
          <router-link :to="{path:'/about'}">dZone</router-link>
          <el-divider direction="vertical"></el-divider>
          <span>川ICP备15032882号</a></span>
        </div>
      </div>
    </el-main>    
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      articleList: [],
      categoryList: [],
      currentCategory: '/all',
      currentPageSize: 10,
      currentPage: 1,
      hotBlogs: [],
      key: {
        keyWords: '',
        keyWordsType: 'title'
      }
    }
  },
  methods: {
    getCategoryList: async function () {
      const data = await this.$http.get('categoryList')
      this.categoryList = data.data
    },
    getBlogs: async function (val) {
      const data = await this.$http.get('blogs' + val)
      this.articleList = data.data 
    },
    getBlogsAll: async function () {
      const data = await this.$http.get('BlogsAll')
      this.articleList = data.data
      this.hotBlogs = JSON.parse(JSON.stringify(data.data))
    },
    changeBlogCategory: function (index) {
      this.getBlogs(index)
    },
    handleSizeChange: function (size) {
      this.currentPageSize = size
    },
    handleCurrentChange: function (page) {
      this.currentPage = page
    },
    searchKeyWords: async function () {
      let key = {
        keyWords: '%' + this.key.keyWords + '%',
        keyWordsType: this.key.keyWordsType
      }
      console.log(key)
      const data = await this.$http.post('/searchKeyWords', key)
      this.articleList = data.data 
    }
  },
  created: function () {
    this.getCategoryList()
    this.getBlogsAll()
    // const date = Date.now()
    // console.log(date)
  },
  computed: {
    blogsNum: function () {
      return this.articleList.length
    },
    articleListFilter: function () {
      let min = (this.currentPage - 1) * this.currentPageSize
      let max = (this.currentPage * this.currentPageSize)
      console.log(min, max, this.articleList.slice(min, max))
      return this.articleList.slice(min, max)
    },
    hotBlogsFilter: function () {
      let data = this.hotBlogs
      for(let i = 0; i< data.length; i++) {
        data[i].hot = data[i].viewsNum + data[i].commentsNum
      }
      for(let i = 0; i < data.length; i++){
        for(let j = i+1; j < data.length; j++){
          if( data[j].hot > data[i].hot ) {
            const temp = data[j]
            data[j] = data[i]
            data[i] = temp
          }
        }
      }
      return data.slice(0, 5)
    } 
  }
}
</script>

<style  lang="less" scoped>
.el-container {
    background-color: #f3f3f4;
    overflow: auto;
    .el-aside {
      padding: 20px 0px 0 40px;
      border: none;
      .el-menu {
        border: none;
        .el-menu-item {
          margin: 8px 0 8px 0;
          border-radius: 8px 0 0 8px;
          padding-left: 30px !important;
          font-size: 16px;
          &:hover {
            background-color: #fff !important;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            width: 160px;
          } 
        }
      }
      .is-active {
        background-color: #fff !important;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      }
    }
    .el-main {
      margin: 0;
      padding: 0;
      background-color: #f3f3f4;
      .main-box {
        width: 100%;
        margin-top: 28px;
        display: flex;
        padding-bottom: 60px;
        position: relative;
        .middle {
          flex: 1;
          // margin-right: 20px;
          // background-color: #fff;
          border-radius: 0 8px 8px 0;
          .searchBox {
            background-color: #fff;
            width: 100%;
            height: 50px;
            padding: 5px;
            box-sizing: border-box;         
          }
          ul {
            background-color: #fff;
          }
          .paginationBlock {
            background-color: #fff;
            padding: 10px 10px;
          }
          li {
            .contentBox {
              padding: 10px 20px;
              border-bottom: 1px dashed #d7d7da;
            }
          }
        }
        .rightSide {
          margin-left: 20px;
          width: 300px;
          padding-right: 20px;
          .el-card {
            width: 100%;
            margin-bottom: 20px;
            .el-card__body {
              padding: 0 !important;
            }
          }
          .about {
            height: 200px;
          }
          .calendarBox {
            .el-calendar{
              font-size: 12px;
            }
          }
        }
        .footer {
          // transform: translateX(-200px);
          position: absolute;
          bottom: 0;
          height: 60px;
          width: 100%;
          text-align: center;
          font-size: 14px;
          padding: 23px 0;
          box-sizing: border-box;
          a {
            text-decoration: none;
          }
        }
      }
    }    
}
</style>
