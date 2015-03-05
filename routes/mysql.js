var mysql = require('mysql');

function fetchData(sqlQuery, callback) {

    console.log("\nSQL Query::" + sqlQuery);

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LinkedIn'
    });

    connection.query(sqlQuery, function (err, rows, fields) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {
            //console.log("DB Results:" + rows);
            callback(err, rows);
        }
    });
    connection.end();
    console.log("\nConnection closed..");
}

exports.fetchData = fetchData;
//connection.connect();