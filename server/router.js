const express = require('express');
const router = express.Router();
const service = require('./services.js');

//分类
router.get('/categoryList',service.getCategoryList);
router.post('/addCategory',service.addCategory)
router.put('/editCategory',service.editCategory)
router.get('/categoryById/:id',service.getCategoryById)
router.delete('/deleteCategory/:id',service.deleteCategory)

//Blog
router.get('/blogs/:cate',service.getBlogs);
router.get('/blogsAll',service.getBlogsAll);
router.post('/uploadBlog',service.uploadBlog)
router.put('/editBlog',service.editBlog)
router.delete('/deleteBlog/:id',service.deleteBlog)
router.post('/searchKeyWords',service.searchKeyWords)

//Blog评论
router.get('/getBLogContent/:id',service.getBLogContent);
router.get('/getBlogComments/:id',service.getBlogComments);
router.get('/getSingleBlogCommentDataById/:id',service.getSingleBlogCommentDataById);
router.post('/uploadBlogComment',service.uploadBlogComment)
router.put('/editBlogComment',service.editBlogComment)
router.delete('/deleteBlogComment/:id',service.deleteBlogComment)

//评论
router.get('/getComments',service.getComments)
router.get('/getSingleCommentDataById/:id',service.getSingleCommentDataById)
router.delete('/deleteComment/:id',service.deleteComment)
router.post('/uploadComment',service.uploadComment)
router.put('/editComment',service.editComment)

//登录
router.post('/login',service.login)
router.put('/changePassword',service.changePassword)

//七牛上传图片
router.get('/token', service.getQiniuToken);

module.exports = router;