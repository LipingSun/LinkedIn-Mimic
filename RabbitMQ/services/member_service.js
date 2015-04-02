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
			rpcRes.data = data;
			callback(null, rpcRes);
		} else {
			rpcRes.success = false;
			rpcRes.value = 'Can\'t find users';
			callback(null, rpcRes);
		}
	});
};

memberService.sendInvitation = function(msg, callback){
	var sql = 'INSERT INTO connections (user_id, other_id, status) VALUES (' + msg.user_id + ',' + msg.other_id + ',' + msg.status + ')';
	mysql.query(sql, function (err, data) {
		//console.log(data[0]);
		if (data[0]) {
			rpcRes.success = true;
			rpcRes.value = 'Send invitation success';
			rpcRes.data = data;
			callback(null, rpcRes);
		} else {
			rpcRes.success = false;
			rpcRes.value = 'Send invitation failed';
			callback(null, rpcRes);
		}
	});
};

memberService.acceptInvitation = function(msg, callback){
	var sql = 'INSERT INTO connections (user_id, other_id, status) VALUES (' + msg.user_id + ',' + msg.other_id + ',' + msg.status + ')';
	mysql.query(sql, function (err, data) {
		//console.log(data[0]);
		if (data[0]) {
			rpcRes.success = true;
			rpcRes.value = 'Accept invitation success';
			rpcRes.data = data;
			callback(null, rpcRes);
		} else {
			rpcRes.success = false;
			rpcRes.value = 'Accept invitation failed';
			callback(null, rpcRes);
		}
	});
};

module.exports = memberService;