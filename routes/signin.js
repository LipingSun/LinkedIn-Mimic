var express = require('express');
var mysql = require('./mysql');
var time = require('./time');
var session = require('express-session');
var crypto = require('crypto');
var router = express.Router();
var rpc = require('amqp-rpc').factory({
    url: "amqp://guest:guest@127.0.0.1:5672"
});

router.post('/', function(req, res, next) {
    console.log('req: ' + JSON.stringify(req.body));

    var rpcReq = {
        service: 'signin',
        message: req.body
    };

    rpc.call('loginService', rpcReq, function(rpcRes) {
        console.log('results:', rpcRes);
        if (rpcRes.signin === true) {
            req.session.regenerate(function (err) {
                req.session.user = rpcRes.user;
                res.location('/home');
                res.end('Login Success');
            });
        }
        else {
            res.send(rpcRes.value);
        }
    });

    /*var sql = 'SELECT * FROM user WHERE email="' + req.body.email + '"';
    mysql.query(sql, function (err, data) {
        //console.log(data[0]);
        if (data[0]) {
            console.log('pw: ' + data[0].password);
            crypto.pbkdf2(req.body.password, data[0].salt, 10000, 32, 'sha256', function(err, key) {
                if (key.equals(data[0].password)) {
                    req.session.regenerate(function (err) {
                        req.session.user = data[0];
                        res.location('/home');
                        res.end('Login Success');
                        console.log('login time: ' + time());
                        var sql = 'UPDATE user SET last_login_time=' + mysql.escape(time()) + ' WHERE user_id=' + req.session.user.user_id;
                        mysql.query(sql, function (err, data) {
                            if (err) console.log("DB ERROR: " + err.message);
                        });
                    });
                } else {
                    res.send('Wrong Password');
                }
            });
        } else {
            res.send('Can\'t find this user');
        }
    });*/
});

module.exports = router;