var express = require('express');
var mysql = require('./mysql');
var router = express.Router();

router.get('/', function (req, res) {
    console.log('homesession: ' + JSON.stringify(req.session));
    //res.send(req.session.email);
    res.render('home', { title: 'Home' });
});


module.exports = router;