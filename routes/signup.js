var express = require('express');
var mysql = require('./mysql');
var time = require('./time');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body);
    var sql = 'INSERT INTO user (email, password, firstname, lastname, last_login_time) VALUES ('
        + mysql.escape(req.body.email) + ', '
        + mysql.escape(req.body.password) + ', '
        + mysql.escape(req.body.firstname) + ', '
        + mysql.escape(req.body.lastname) + ', '
        + mysql.escape(time()) + ')';
    console.log(sql);
    mysql.query(sql, function (err, data) {
        res.send("db good");
    });
});

module.exports = router;