var express = require('express');
var mysql = require('./mysql');
var time = require('./time');
var session = require('express-session');
var crypto = require('crypto')
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body);
    var rpcReq = {
        service: 'signup',
        message: req.body
    };

    crypto.randomBytes(16, function(ex, salt) {
        if (ex) throw ex;
        console.log('Have %d bytes of random salt: %s', salt.length, salt.toString('hex'));
        crypto.pbkdf2(req.body.password, salt, 10000, 32, 'sha256', function(err, key) {
            if (err) throw err;

            console.log('Have %d bytes of key: %s', key.length, key.toString('hex'));

            var sql = 'INSERT INTO user (email, password, salt, firstname, lastname, last_login_time) VALUES ('
                + mysql.escape(req.body.email) + ', '
                + mysql.escape(key) + ', '
                + mysql.escape(Buffer(salt, 'binary')) + ', '
                + mysql.escape(req.body.firstname) + ', '
                + mysql.escape(req.body.lastname) + ', '
                + mysql.escape(time()) + ');'
                + 'SELECT * FROM user WHERE email=' + mysql.escape(req.body.email);
            mysql.query(sql, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    req.session.regenerate(function (err) {
                        req.session.user = data[1][0];
                        req.session.user.last_login_time = null;
                        res.location('/home');
                        res.end('Signup Success');
                    });
                }
            });
        });
    });
});

module.exports = router;