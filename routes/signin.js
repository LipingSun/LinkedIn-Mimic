var express = require('express');
var mysql = require('./mysql');
var time = require('./time');
var session = require('express-session');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.body));
    var sql = 'SELECT * FROM user WHERE email="' + req.body.email + '"';
    mysql.query(sql, function (err, data) {
        //console.log(data[0]);
        if (data[0]) {
            if (req.body.password === data[0].password) {
                req.session.regenerate(function (err) {
                    req.session.user = data[0];
                    res.location('/home');
                    res.end('Login Success');
                    console.log('login time: ' + time());
                    var sql = 'UPDATE user SET last_login_time=' + mysql.escape(time()) + ' WHERE user_id='+ req.session.user.user_id;
                    mysql.query(sql, function (err, data) {
                        if (err) console.log("DB ERROR: " + err.message);
                    });
                    res.location('/home');
                    res.end('Login Success');
                });
            } else {
                res.send('Wrong Password');
            }
        } else {
            res.send('Can\'t find this user');
        }
    });
});

module.exports = router;