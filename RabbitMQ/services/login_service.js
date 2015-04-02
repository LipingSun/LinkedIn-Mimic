var crypto = require('crypto');
var mysql = require('./mysql');
var time = require('./time');

var loginService = {};
var rpcRes = {};

loginService.signup = function (msg, callback) {

	crypto.randomBytes(16, function(ex, salt) {
		if (ex) throw ex;
		console.log('Have %d bytes of random salt: %s', salt.length, salt.toString('hex'));
		crypto.pbkdf2(msg.password, salt, 10000, 32, 'sha256', function(err, key) {
			if (err) throw err;

			console.log('Have %d bytes of key: %s', key.length, key.toString('hex'));

			var sql = 'INSERT INTO user (email, password, salt, firstname, lastname, last_login_time) VALUES ('
				+ mysql.escape(msg.email) + ', '
				+ mysql.escape(key) + ', '
				+ mysql.escape(Buffer(salt, 'binary')) + ', '
				+ mysql.escape(msg.firstname) + ', '
				+ mysql.escape(msg.lastname) + ', '
				+ mysql.escape(time()) + ');'
				+ 'SELECT * FROM user WHERE email=' + mysql.escape(msg.email);
			mysql.query(sql, function (err, data) {
				if (err) {
					console.log(err);
					rpcRes.success = false;
					rpcRes.value = 'Sign up failed';
					callback(null, rpcRes);
				} else {
					rpcRes.success = true;
					rpcRes.value = 'Sign up success';
					rpcRes.data = data[1][0];
					callback(null, rpcRes);
				}
			});
		});
	});
};

loginService.signin = function(msg, callback){
	var sql = 'SELECT * FROM user WHERE email="' + msg.email + '"';
	mysql.query(sql, function (err, data) {
		//console.log(data[0]);
		if (data[0]) {
			console.log('pw: ' + data[0].password);
			crypto.pbkdf2(msg.password, data[0].salt, 10000, 32, 'sha256', function(err, key) {
				if (key.equals(data[0].password)) {
					rpcRes.success = true;
					rpcRes.value = 'Success Login';
					rpcRes.data = data[0];
					sql = 'UPDATE user SET last_login_time=' + mysql.escape(time()) + ' WHERE user_id=' + rpcRes.data.user_id;
					mysql.query(sql, function (err, data) {
						if (err) console.log("DB ERROR: " + err.message);
					});
					callback(null, rpcRes);
				} else {
					rpcRes.success = false;
					rpcRes.value = 'Wrong Password';
					callback(null, rpcRes);
				}
			});
		} else {
			rpcRes.success = false;
			rpcRes.value = 'Can\'t find this user';
			callback(null, rpcRes);
		}
	});
};

module.exports = loginService;