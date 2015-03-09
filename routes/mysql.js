var mysql = require('mysql');

function query(sqlQuery, callback) {

    console.log("\nSQL Query::" + sqlQuery);

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
            //console.log("DB Results:" + rows);
            callback(err, data);
        }
    });
    connection.end();
    console.log("\nConnection closed..");
}

module.exports.query = query;