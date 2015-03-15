var mysql = require('mysql');

function query(sqlQuery, callback) {

    console.log("\nSQL Query: " + sqlQuery);

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LinkedIn'
    });

    connection.query(sqlQuery, function (err, data, fields) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {
            console.log("DB Results:" + JSON.stringify(data));
            callback(err, data);
        }
    });
    //connection.end();
    //console.log("\nConnection closed..");
}

function fetch (userID, callback) {

    var user = {
        summary: null,
        education: null,
        experience: null,
        skills: null
    };

    query('SELECT * FROM summary where user_id=' + userID, function (err, data) {
        user.summary = data;
    });
    //query('SELECT * FROM education where user_id=' + userID, function (err, data) {
    //    user.education = data;
    //});
    //query('SELECT * FROM experience where user_id=' + userID, function (err, data) {
    //    user.experience = data;
    //});
    //query('SELECT * FROM skills where user_id=' + userID, function (err, data) {
    //    user.skills = data;
    //});

    while (true) {
        if (isUserDataComplete()) {
            console.log(JSON.stringify(user));
            callback(null, user);
        }
    }

    function isUserDataComplete() {
        for (var property in user) {
            if (user[property] === null) return false;
        }
        return true;
    }
}



function fetchDataWithoutPool (userID) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LinkedIn'
    });

    var user = {
        summary: null,
        education: null,
        experience: null,
        skills: null
    };

    function getEmptyProperty() {
        for (var property in user) {
            if (user[property] === null) {
                return property;
            }
        }
    }

    function fetchRelatedData(){
        var property = null;
        property = getEmptyProperty();
        if (property) {
            connection.query('SELECT * FROM ' + property + ' where user_id=' + userID, function (err, data) {
                property = data;
                console.log(JSON.stringify(user));
                fetchRelatedData();
            });
        }
    }

    fetchRelatedData();


    //for (var table in user) {
    //    console.log(table.toString());
        //query('SELECT * FROM ' + table + ' where user_id=' + userID, function (err, data, next) {
        //    //user[table.toString()] = data;
        //    //console.log(table.toString());
        //    //console.log(data);
        //});
//    }
//    console.log(user);
//    ['summary', 'education', 'experience', 'skills'].forEach(function (table) {
//        query('SELECT * FROM ' + table + ' where user_id=' + userID, function (err, data) {
//            user.table = data;
//        });
//    });
//    console.log(user);
}


module.exports.query = query;
module.exports.fetch = fetch;