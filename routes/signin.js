var express = require('express');
var mysql = require('./mysql');
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
                    req.session.email = data[0].email;
                    //if (req.session.email)
                    //    res.session.email = req.session.email;
                        //console.log('session final: ' + JSON.stringify(req.session));
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