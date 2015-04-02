var express = require('express');
var mysql = require('./mysql');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.session.user) {
        console.log('session: ' + JSON.stringify(req.session.user));
        res.render('home');
    } else {
        res.render('index');
    }

});

router.get('/user', function (req, res) {
    var user = req.session.user;

    var sql = 'SELECT * FROM summary WHERE user_id=' + mysql.escape(user.user_id) + ';'
        + 'SELECT * FROM education WHERE user_id=' + mysql.escape(user.user_id) + ';'
        + 'SELECT * FROM experience WHERE user_id=' + mysql.escape(user.user_id) + ';'
        + 'SELECT * FROM skills WHERE user_id=' + mysql.escape(user.user_id) + ';'
        + 'SELECT * FROM connections WHERE user_id=' + mysql.escape(user.user_id) + ';';

    mysql.query(sql, function (err, data) {
        var userData = {
            name: {
                firstname: user.firstname,
                lastname: user.lastname
            },
            last_login_time: user.last_login_time,
            summary: data[0],
            education: data[1],
            experience: data[2],
            skills: data[3],
            connections: data[4]
        };
        console.log('return data:' + JSON.stringify(userData));
        res.send(userData);
    });

});


module.exports = router;