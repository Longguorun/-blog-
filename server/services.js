const db = require('./db.js');
const qiniu = require('qiniu');

//分类
exports.getCategoryList = (req,res)=>{
	let sql = 'select * from categorylist';
	let data = null;
	db.opreate(sql,data,(results)=>{
		res.json(results);
	});
};
exports.getCategoryById = (req,res)=>{
	let sql = 'select * from categorylist where id=?';
	let data = [req.params.id];
	db.opreate(sql,data,(results)=>{
		res.json(results);
	});
};
exports.addCategory = (req,res)=>{
	let category = req.body;
	let sql = 'insert into categorylist set ?';
	let data = [category];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({addCategoryFlag:true});
		}
		else {
			res.send({addCategoryFlag:false});
		}
	});
};
exports.editCategory = (req,res)=>{
	let category = req.body;
	let id = category.id;
	let sql = 'update categorylist set ? where id=?';
	let data = [category,id];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({editCategoryFlag:true});
		}
		else {
			res.send({editCategoryFlag:false});
		}
	});
};
exports.deleteCategory = (req,res)=>{
	let sql = 'delete from categorylist where id=?';
	let data = [req.params.id];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({deleteCategoryFlag:true});
		}
		else {
			res.send({deleteCategoryFlag:false});
		}
	});
};


//Blog
exports.getBlogs = (req,res)=>{
	let cate = req.params.cate;
	let sql = '';
	let data = [];
	if(cate === 'all') {
		sql = 'select * from blog';
		data = null;		
	} else {
		sql = 'select * from blog where category_ename=?';
		data = [cate];				
	}
	db.opreate(sql,data,(results)=>{
		let index = 1;
		results.reverse();
		for(let key in results) {
			results[key].index = index++;
		}
		res.json(results);
	});
};
exports.getBlogsAll = (req,res)=>{
	let	sql = 'select * from blog';
	let	data = null;				
	db.opreate(sql,data,(results)=>{
		let index = 1;
		// results.reverse();
    var compare = function(a,b) {
      return parseInt(b.date) - parseInt(a.date);
    };
    results.sort(compare);
		for(let key in results) {
			results[key].index = index++;
		}
		res.json(results);
	});
};
exports.getBLogContent = (req,res)=>{
	let id = req.params.id;
	let sql = 'select * from blog where id=?';
	let data = [id];				
	db.opreate(sql,data,(results)=>{
		res.json(results);
		let num = results[0].viewsNum + 1;
		sql = 'update blog set viewsNum =? where id =?'
		data = [num, id]
		db.opreate(sql,data,(results)=>{
		});
	});
};
exports.uploadBlog = (req,res)=>{
	let blog = req.body;
	let sql = 'insert into blog set ?';
	let data = [blog];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({uploadBlogFlag:true});
		}
		else {
			res.send({uploadBlogFlag:false});
		}
	});
};
exports.editBlog = (req,res)=>{
	let blog = req.body;
	let id = req.body.id;
	let sql = 'update blog set ? where id=?';
	let data = [blog,id];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({editBlogFlag:true});
		}
		else {
			res.send({editBlogFlag:false});
		}
	});
};
exports.deleteBlog = (req,res)=>{
	let sql = 'delete from blog where id=?';
	let data = [req.params.id];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({deleteBlogFlag:true});
		}
		else {
			res.send({deleteBlogFlag:false});
		}
	});
};
exports.searchKeyWords = (req,res)=>{
	let sql = 'select * from blog where '+req.body.keyWordsType+' like ?';
	let data = [req.body.keyWords];
	db.opreate(sql,data,(results)=>{
		let index = 1;
		for(let key in results) {
			results[key].index = index++;
		}
		res.send(results);
	});
};


//Blog评论
exports.getBlogComments = (req,res)=>{
	let id = req.params.id;
	let sql = 'select * from blogcomments where blogId=?';
	let data = [id];

	db.opreate(sql,data,(results)=>{
		let source = results;
		var findParent = function (s) {
			if(s.parentId !== null) {
				for(let key in results){
					if(s.parentId === results[key].commentId){
						s.parent = results[key];
						findParent(s.parent);
					}
				}
			}
		}
		for(let key in source){
			findParent(source[key]);
		}
    let index = 1;
    results.reverse();
    for(let key in results) {
      results[key].index = index++;
    }
		res.json(source);
	});
};
exports.uploadBlogComment = (req,res)=>{
	let blogComment = req.body;
	let id = req.body.blogId;
	let sql = 'insert into blogcomments set ?';
	let data = [blogComment];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({uploadBlogCommentFlag:true});
			sql = 'select count(*) from blogcomments where blogId=?';
			data = [id];
			db.opreate(sql,data,(results)=>{
				let data = 0;
				for(let key in results[0]) data = results[0][key];
					sql = 'update blog set commentsNum =? where id =?';
					data = [data, id];
					db.opreate(sql,data,(results)=>{});
			});
		}
		else {
			res.send({uploadBlogCommentFlag:false});
		}
	});
};
exports.getSingleBlogCommentDataById = (req,res)=>{
	let sql = 'select * from blogcomments where commentId=?';
	let data = [req.params.id];
	db.opreate(sql,data,(results)=>{
		results.reverse();
		res.json(results);
	});
};
exports.editBlogComment = (req,res)=>{
	let comment = req.body;
	let id = req.body.commentId;
	let sql = 'update blogcomments set ? where commentId =?';
	let data = [comment, id];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({editBlogCommentFlag:true});
		}
		else {
			res.send({editBlogCommentFlag:false});
		}
	});
};
exports.deleteBlogComment = (req,res)=>{
	let sql = 'select blogId from blogcomments where commentId=?';
	let data = [req.params.id];
	let id = 0;
	db.opreate(sql,data,(results)=>{
		id = results[0].blogId;
	});
	sql = 'delete from blogcomments where commentId=?';
	data = [req.params.id];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({deleteBlogCommentFlag:true});
			sql = 'select count(*) from blogcomments where blogId=?';
			data = [id];
			db.opreate(sql,data,(results)=>{
				let data = 0;
				for(let key in results[0]) data = results[0][key];
					sql = 'update blog set commentsNum =? where id =?';
					data = [data, id];
					db.opreate(sql,data,(results)=>{});
			});
		}
		else {
			res.send({deleteBlogCommentFlag:false});
		}
	});
};


//评论
exports.getComments = (req,res)=>{
	let sql = 'select * from comments';
	let data = null;
	db.opreate(sql,data,(results)=>{
    let index = 1;
    results.reverse();
    for(let key in results) {
      results[key].index = index++;
    }
		res.json(results);
	});
};
exports.getSingleCommentDataById = (req,res)=>{
	let sql = 'select * from comments where commentId=?';
	let data = [req.params.id];
	db.opreate(sql,data,(results)=>{
		results.reverse();
		res.json(results);
	});
};
exports.deleteComment = (req,res)=>{
	let sql = 'delete from comments where commentId=?';
	let data = [req.params.id];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({deleteCommentFlag:true});
		}
		else {
			res.send({deleteCommentFlag:false});
		}
	});
};
exports.uploadComment = (req,res)=>{
	let comment = req.body;
	let sql = 'insert into comments set ?';
	let data = [comment];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({uploadCommentFlag:true});
		}
		else {
			res.send({uploadCommentFlag:false});
		}
	});
};
exports.editComment = (req,res)=>{
	let comment = req.body;
	let id = req.body.commentId;
	let sql = 'update comments set ? where commentId =?';
	let data = [comment, id];
	db.opreate(sql,data,(results)=>{
		if(results.affectedRows == 1) {
			res.send({editCommentFlag:true});
		}
		else {
			res.send({editCommentFlag:false});
		}
	});
};


//登录
exports.login = (req,res)=>{
	let user = req.body;
	let sql = 'select password from user where username=?';
	let data = [user.username];
	db.opreate(sql,data,(results)=>{
		if(results[0].password == user.password) {
			res.send({loginSuccess:true});
		}
		else {
			res.send({loginSuccess:false});
		}
	});
};
exports.changePassword = (req,res)=>{
	let sql = 'select password from user where username=?';
	let data = [req.body.username];
	db.opreate(sql,data,(results)=>{
		if(results[0].password === req.body.oldPassword) {
			sql = 'update user set password=? where username=?';
			data = [req.body.newPassword2, req.body.username];
			db.opreate(sql,data,(results)=>{
				if(results.affectedRows == 1) {
					res.send({changePasswordFlag:true});
				}
				else {
					res.send({changePasswordFlag:false});
				}
			});
		}
		else {
			res.send({changePasswordFlag:false});
		}
	});
};


//七牛上传图片
exports.getQiniuToken = (req,res)=>{
  const accessKey = '3omrWZrTo6wKxuQ1TKUgVmpjFypId7NtoPZDq42x';
  const secretKey = 'IsITVSDeG3omI1xilcK1rx7QsN94nGsjvwOkADXl';
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: 'dzone-images-storage',
    expires: 7200
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
	res.status(200).send(uploadToken);
};