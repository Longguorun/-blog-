const mysql = require('mysql');

exports.opreate = (sql,data,callback)=>{
	const connection = mysql.createConnection({
	  host     : 'rm-2vcgcds1p5ieaokqmzo.mysql.cn-chengdu.rds.aliyuncs.com',
	  user     : 'mydata_dzone',
	  password : 'qweRT123',
	  database : 'mydata'
	});

	connection.connect();
	connection.query(sql ,data , function (error, results, fields) {
		if(error) throw error;
		callback(results);
	});
	connection.end();
};