## 个人博客的搭建

网址：http://139.155.49.173/

### 1.简介

dZone是一个个人博客网站，支持markdown格式的博客文章显示，用于分享总结前端开发学习中的问题

<img src="http://139.155.49.173/img/logo.500212e5.jpg" alt="logo" style="zoom:50%;" />



### 2.特点

1. 前后端分离：所有显示数据均通过后端服务器从数据库中获取；前端对其进行渲染

2. 响应式布局：支持PC端及手机端的显示

   

### 3.技术栈

- 前端：Vue( axios、vuex )、Element UI、webpack

- 后端：Node.js、Express、MySQL

- 服务器部署：Nginx、PM2

  

### 4.详细功能介绍

#### 4.1前端

##### 4.1.1前台内容显示

- 主页面（/blogs）：显示blog文章列表

  ![blogs列表页面](http://qdg8er2gb.bkt.clouddn.com/typera/20200719154829.png)

  1. 分类列表及相应分类文章动态更新（后端操作数据库实现）
  2. 文章数目动态显示（前端计算属性实现）
  3. 对标题及正文的关键字搜索（后端操作数据库实现）
  4. 发表时间显示（前端过滤属性实现-获得的时间数据格式为UTC毫秒时间字符串）
  5. 单个文章热度—观看数量 + 评论数量 动态更新（后端操作数据库实现）
  6. 文章排序（后端逻辑添加 + 前端计算属性实现）
  7. 动态翻页（前端计算属性实现：对当前所选每页size及页码page计算结果后剪切对应索引文章数据）
  8. 热门文章，热度计算规则：观看数量 + 评论数量（前端计算属性实现）

  **待完善的问题点：翻页条的响应式实现**

- 文章内容页（/blogcontent/:id）：显示对应blog文章的内容详情及评论信息

  ![image-20200719163327276](http://qdg8er2gb.bkt.clouddn.com/typera/20200719163331.png)

  ![image-20200719163356682](http://qdg8er2gb.bkt.clouddn.com/typera/20200719163358.png)

  1. Markdown格式文本的显示（使用mavon-editor插件实现；缺点：排版略丑，很难兼顾移动端和PC端的显示效果）
  2. 评论数目的动态显示（前端计算属性实现）
  3. 访客对当前文章的评论功能（使用mavon-editor插件实现）：**支持头像选择**（待完善：访客自行添加头像）；**支持用户名绑定访客自己主页链接**；**支持Markdown格式的评论内容**，支持代码块、表格等，能够完全再现评论时的排版布局；**支持图片评论**（使用七牛云对象存储返回对应存储地址）；**支持匿名评论**
  4. 评论楼层显示（前端计算属性实现）
  5. 评论翻页（前端计算属性实现：对当前所选每页size及页码page计算结果后剪切对应索引评论数据）

- 网站留言页（/comments）：访客可在此页面进行留言；显示留言列表

  ![image-20200719163702887](http://qdg8er2gb.bkt.clouddn.com/typera/20200719163704.png)

  功能和实现方法与 上文 **文章评论 ** 类似，不再赘述

- 关于页（/about）：显示网站作者的信息

  ![image-20200719163944527](http://qdg8er2gb.bkt.clouddn.com/typera/20200719163946.png)

  待更改：此页面为了匹配PC及手机端的显示效果，目前略丑，需要进行更改

- 后台管理登录页（/login）：进入后台管理页面的登录入口

  ![image-20200719164238035](http://qdg8er2gb.bkt.clouddn.com/typera/20200719164239.png)

  待完善：考虑到网站应用场景不多，目前的登录只是简单的验证数据库密码，后续有需求会增加token登录功能

  

##### 4.1.2后台数据管理

- 分类管理（/categoryManage）

  ![image-20200719164627016](http://qdg8er2gb.bkt.clouddn.com/typera/20200719164643.png)

  1. 添加分类、编辑分类：这两个功能使用同一个diolog弹出框，通过判断具体的使用情况显示不同的功能内容，点击编辑分类内容会返回当前分类的具体数据情况，方便编辑。且diolog能够实现前端表单数据验证，防止错误格式数据上传

     ![image-20200719165023682](http://qdg8er2gb.bkt.clouddn.com/typera/20200719165028.png)

     ![image-20200719165105050](http://qdg8er2gb.bkt.clouddn.com/typera/20200719165108.png)

  2. 分类删除

- 博客管理（/blogManage）：显示所有blogs列表，并能够实现单个blog文章的编辑、删除、评论管理的操作

  ![image-20200719170026551](http://qdg8er2gb.bkt.clouddn.com/typera/20200719170029.png)

  1. 文章编辑（/editBlog/:id）：能够对相应id文章的标题、是否原创、分类、链接及正文内容进行修改

     ![image-20200719165644825](http://qdg8er2gb.bkt.clouddn.com/typera/20200719165646.png)

     正文编辑使用mavon-editor插件实现的markdown文本编辑功能，获取文章的当前内容显示在输入框中，并且输入框右边能够显示对应的显示效果，方便进行编辑操作

  2. 文章删除：删除对应文章

  3. 评论管理（/blogCommentsManage/:id）：能够显示id对应文章下访客的评论列表，并能进行编辑个删除操作

     ![image-202007191704402481](http://qdg8er2gb.bkt.clouddn.com/typera/20200719170536.png)

     ![image-20200719170525779](http://qdg8er2gb.bkt.clouddn.com/typera/20200719170529.png)

- 发表博客（/addBlog）：用于发表一个全新的blog文章

  ![image-20200719170754680](http://qdg8er2gb.bkt.clouddn.com/typera/20200719170755.png)

  功能与blog管理页面相似，不再赘述

- 留言管理（/commentsManage）：能够显示网站留言列表，并能对列表进行编辑、删除管理

  ![](http://qdg8er2gb.bkt.clouddn.com/typera/20200719171021.png)

  功能与blog评论管理页面相似，不再赘述

- 账号管理（/accountManage）：对登录后台管理页面的账号密码进行修改

  ![image-20200719171353192](http://qdg8er2gb.bkt.clouddn.com/typera/20200719171355.png)



#### 4.2后端

后端的逻辑功能如下：

1. 服务器端允许跨域：解决前端页面与后端接口之间的跨域问题

2. static静态页面挂载

3. 后端路由：经由路由，寻找与之匹配的服务

4. 服务：实现对sql数据库的增删改查和对数据的处理，常见命令格式如下

   ```javascript
   //查
   select * from xxx where id = ?
   //增
   insert into xxx set ?
   //删
   delete from xxx where id = ?
   //改
   update xxx set ? where id = ?
   ```

5. 数据库连接

   

### 5.网站上线

1. 云服务器配置

2. 数据库配置

3. nginx使用（轻量级web服务器/反向代理服务器）

4. PM2后台挂载

   

### 6.兼容问题

1. 对IE浏览器兼容性不够好
2. 某些使用IE内核的浏览器，如qq浏览器（pc端）因为有两种内核，使用IE内核时，mavon-editor插件不会显示
3. safri在点击代码块时，不能够上下滑动