var mysql = require('./mysql');

var memberService = {};
var rpcRes = {};

memberService.searchMember = function(msg, callback){
	var sql = 'SELECT user_id, firstname, lastname FROM user WHERE firstname="' + msg.name + '" OR lastname="' + msg.name + '"';
	mysql.query(sql, function (err, data) {
		//console.log(data[0]);
		if (data[0]) {
			rpcRes.success = true;
			rpcRes.value = 'Find users';
			rpcRes.users = data;
			callback(null, rpcRes);
		} else {
			rpcRes.success = false;
			rpcRes.value('Can\'t find users');
			callback(null, rpcRes);
		}
	});
};

module.exports = memberService;