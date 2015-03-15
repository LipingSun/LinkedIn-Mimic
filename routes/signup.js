var express = require('express');
var mysql = require('./mysql');
var time = require('./time');
var session = require('express-session');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body);
    var sql = 'INSERT INTO user (email, password, firstname, lastname, last_login_time) VALUES ('
        + mysql.escape(req.body.email) + ', '
        + mysql.escape(req.body.password) + ', '
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

module.exports = router;