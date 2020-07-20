<template>
  <el-container class='el-bigBox'>
    <el-header>
      <div class="logoBox">
        <img src='../assets/logo.jpg'>
        <h1>dZone博客后台管理</h1>
      </div>
      <el-button type="info" round @click='logout'>注销</el-button>
    </el-header>
    <el-container>
      <el-aside :width=asideWidth>
        <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#3B93E5"
        :collapse-transition='false'
        router>
          <el-menu-item v-for="item in manageList" :key='item.id' :index="item.function" style='font-size: 16px;text-align: center;'>{{item.title}}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      defaultActive: this.$route.path,
      manageList: [{
        id: 1,
        function: '/categoryManage',
        title: '分类管理'
      }, {
        id: 2,
        function: '/blogManage',
        title: '博客管理'
      }, {
        id: 3,
        function: '/addBlog',
        title: '发表博客'
      }, {
        id: 4,
        function: '/commentsManage',
        title: '评论管理'
      }, {
        id: 5,
        function: '/accountManage',
        title: '账号管理'
      }],
      list: [],
      asideWidth: '200px'
    }
  },
  methods: {
    logout: function () {
      window.sessionStorage.clear()
      this.$router.push('/')
      this.$message({
        message: '账号注销成功',
        center: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-bigBox {
  height: 100%;
  width: 100%;
  position: relative;
  .el-header {
    height: 80px !important;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    .logoBox {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        align-items: center;
        margin: 0 10px;
      }
      h1 {
        display: inline-block;
        font-size: 30px;
        padding: 0;
        margin: 0;
        color: #fff;
        margin: 0 10px;
        letter-spacing: 3px;
        font-weight: 400;
      }
    }
    .el-button {
      border-radius: 10px;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 3px;
      z-index: 999;
      &:hover {
        color: red;
      }
    }
  }
  > .el-container {
    width: 100%;
    height: 100%;
    padding-top: 80px;
    position: absolute;
    .el-aside {
      background-color: #333744;
      .el-menu {
        border-right: none;
      }
    }
    .el-main {
      background-color: #eaedf1;
      height: 100%;
    }
  }
}
</style>
