<template>
<el-container>
  <el-header height='80px'>
    <div class="logo">
      <img src="../assets/logo.jpg">
      <h4>dZone</h4>
    </div>
    <el-menu class="el-menu-demo hidden-xs-only" mode="horizontal" :border='false' text-color='#333' active-text-color='#f60' :default-active='defaultPage' @select='navClick' router>
      <el-menu-item index="/blogs" class='el-icon-edit'>博客</el-menu-item>
      <el-menu-item index="/contents" class='el-icon-s-comment'>留言</el-menu-item>
      <el-menu-item index="/about" class='el-icon-user-solid'>关于</a></el-menu-item>
      <el-menu-item index='/login' class='el-icon-s-tools'>后台管理</a></el-menu-item>
    </el-menu>
    <el-button class="menu-button hidden-sm-and-up" :class='buttonIcon' @click='clickFoldButton'></el-button>
    <el-row class="tac navbar hidden-sm-and-up" :class='navbarType' >
      <el-col :span="10" style='float: right;'>
        <el-menu
          class="el-menu-vertical-demo"  text-color='#333' active-text-color='#f60' @select='navClick' style='z-index: 999;border-radius: 5px;border: 1px solid rgb(243, 243, 244)' router>
          <el-menu-item index="/blogs">
            <i class="el-icon-edit"></i>
            <span>博客</span>
          </el-menu-item>
          <el-menu-item index="/contents">
            <i class="el-icon-s-comment"></i>
            <span>留言</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-user-solid"></i>
            <span>关于</span>
          </el-menu-item>
          <el-menu-item index="/login">
            <i class="el-icon-s-tools"></i>
            <span>后台管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
  <router-view></router-view>
</el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: function () {
    return {
      buttonIcon: 'el-icon-s-fold',
      navbarType: 'navbarVisible'
    }
  },
  methods: {
    navClick: function (index) {
      this.navbarType = 'navbarVisible'
      this.changeDefaultPage(index)
    },
    clickFoldButton: function () {
      if(this.buttonIcon === 'el-icon-s-fold') {
        this.buttonIcon = 'el-icon-s-unfold'
        this.navbarType = ''
      } else {
        this.buttonIcon = 'el-icon-s-fold'
        this.navbarType = 'navbarVisible'
      }
    },
    ...mapMutations(['changeDefaultPage'])
  },
  computed: {
    ...mapState(['defaultPage'])
  },
  created: function () {
    this.changeDefaultPage(this.$route.path)
  }
}
</script>

<style  lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    width: 100%;
    background-color: #fff;
    position: relative;
    margin: 0;
    padding: 0;
    .logo {
      float: left;
      img, h4 {
        float: left;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
      }
      img {
        height: 60px;
        margin: 10px;
      }
    }
    .el-menu, .menu-button {
      float: right;
    }
    .el-menu--horizontal {
      border: none;
      .el-menu-item {
        padding: 0 5px !important;
        margin: 0 14px;
        font-size: 18px;
      }
    }
    .el-button {
      width: 60px;
      height: 40px;
      margin: 20px;
    }
    .navbar {
      width: 100%;
      position: absolute;
      width: 100%;
      top: 100%;
      background-color: #edf1f5;
      ul {
        list-style-type: none;
        margin: 0;
      }
      .el-col {
        .el-menu {
          width: 100%;
          border-top: 1px solid #f3ebeb;
        }
      }
    }
    .navbarVisible {
      display: none;
    }
  }
}
</style>
