const express = require('express');
const app = express();
const router = require('./router.js');
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //可以被允许跨域的域名，*表示允许所有
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);
//以上跨域请求代码必须放置在router路由挂载之前
app.use(router);
app.use('/www',express.static('./dist/'));


app.listen(3000,()=>{
	console.log('ready...');
});