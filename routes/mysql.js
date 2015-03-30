var mysql = require('mysql');

function query(sqlQuery, callback) {

    console.log("\nSQL Query: " + sqlQuery);

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LinkedIn',
        multipleStatements: true
    });

    connection.query(sqlQuery, function (err, data, fields) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {
            console.log("DB Results:" + JSON.stringify(data));
            callback(err, data);
        }
        connection.end();
        connection.state = "disconnected";
        console.log("\nConnection closed..");
    });
}

module.exports.query = query;
module.exports.escape = mysql.escape;


//My Connection Pool Implementation
var myConnectionPool = {
    size: 0,
    connections: []
};

myConnectionPool.createPool = function (num) {
    myConnectionPool.size = num;
    for (i = 0; i < num; i++) {
        myConnectionPool.connections.push(
            mysql.createConnection({
                host: 'localhost',
                user: 'root',
                database: 'LinkedIn',
                multipleStatements: true
            })
        );
    }
    return myConnectionPool;
}

myConnectionPool.getCon = function() {
    while (true) {
        for (i = 0; i < pool.size; i++) {
            if (pool.connections[i].state === "disconnected") {
                return pool.connections[i];
            }
        }
    }
}

myConnectionPool.releaseCon = function(con) {
    con.state = "disconnected";
    console.log("\nConnection in pool released..");
}

myConnectionPool.query = function(sqlQuery, callback) {
    var con = myConnectionPool.getCon();
    con.query(sqlQuery, function (err, data, fields) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {
            console.log("DB Results:" + JSON.stringify(data));
            callback(err, data);
        }
        myConnectionPool.releaseCon(con);
    });
}

module.exports.myConnectionPool = myConnectionPool;
