<template>
  <el-container>
    <div class="pcBox hidden-xs-only">
      <div class="headBox">
        <el-avatar :size="120" :src="require('../assets/me.jpg')"></el-avatar>     
      </div>
      <div class="contentBox">
        <h1>龙国润</h1>
        <p>毕业于某末流985本科，非计算机相关专业。毕业后第一份工作不十分满意，遂离职转行学习前端，目前已基本学完web前端的相关技术。本个人博客网站纯属练手，旨在能够理解自主完成搭建一个网站的所有流程。</p>
        <P>如果你也喜欢前端开发，那么留个言或者添加联系方式交流吧！</P>
      </div>
      <div class="link">
        <span class="el-icon-message"> 778677347@qq.com</span>
      </div>
    </div>
    <div class="bigBox hidden-sm-and-up">
      <div class="mobileBox">
        <div class="headBox">
          <el-avatar :size="100" :src="require('../assets/me.jpg')"></el-avatar>     
        </div>
        <div class="contentBox">
          <h1>龙国润</h1>
          <p>毕业于某末流985本科，非计算机相关专业。毕业后第一份工作不十分满意，遂离职转行学习前端，目前已基本学完web前端的相关技术。本个人博客网站纯属练手，旨在能够理解自主完成搭建一个网站的所有流程。</p>
          <P>如果你也喜欢前端开发，那么留个言或者添加联系方式交流吧！</P>
        </div>
        <div class="link">
          <span class="el-icon-message"> 778677347@qq.com</span>
        </div>
      </div>      
    </div>
  
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
    }
  }
}
</script>

<style  lang="less" scoped>
.el-container {
  background-color: #f3f3f4;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  .pcBox {
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 30px;
    background-image: linear-gradient(-90deg, #5e8084, #24d4c4);
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
    .headBox {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 5px 5px 2px 5px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
    }
    .contentBox {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 60px;
      color: #fff;
      h1 {
        font-size: 30px;
        font-weight: 500;
        letter-spacing: 5px;
        text-align: center;
        margin-bottom: 30px;
      }
      p {
        padding: 0 40px;
        font-size: 18px;
        line-height: 30px;
        margin-bottom: 20px;
        letter-spacing: 2px;
      }
    }
    .link {
      position: absolute;
      bottom: 20px;
      right: 30px;
      font-size: 12px;
      color: #fff;
    }
  }
  .bigBox {
    width: 100%;
    box-sizing: padding-box;
    padding: 70px 20px 20px 20px;
    .mobileBox {
      background-image: linear-gradient(-90deg, #5e8084, #24d4c4);
      border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
      margin-bottom: 20px;
      .headBox {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 5px 5px 2px 5px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,.15);
      }
      .contentBox {
        width: 100%;
        box-sizing: border-box;
        padding-top: 60px;
        color: #fff;
        h1 {
          font-size: 30px;
          font-weight: 500;
          letter-spacing: 5px;
          text-align: center;
          margin-bottom: 30px;
        }
        p {
          padding: 0 40px;
          font-size: 18px;
          line-height: 30px;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }
      }
      .link {
        // position: absolute;
        // bottom: 20px;
        // right: 30px;
        font-size: 12px;
        color: #fff;
        width: 100%;
        text-align: right;
        height: 30px;
        span {
          margin-right: 20px;
        }
      }
    }    
  }
  
}
</style>