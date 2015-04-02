var mysql = require('./mysql');

var profileService = {};
var rpcRes = {};

profileService.getProfile = function(msg, callback){
    var sql = 'SELECT * FROM summary WHERE user_id=' + mysql.escape(msg.user_id) + ';'
        + 'SELECT * FROM education WHERE user_id=' + mysql.escape(msg.user_id) + ';'
        + 'SELECT * FROM experience WHERE user_id=' + mysql.escape(msg.user_id) + ';'
        + 'SELECT * FROM skills WHERE user_id=' + mysql.escape(msg.user_id) + ';';
    mysql.query(sql, function (err, data) {
        if (!err) {
            var userData = {
                name: {
                    firstname: user.firstname,
                    lastname: user.lastname
                },
                last_login_time: user.last_login_time,
                summary: data[0],
                education: data[1],
                experience: data[2],
                skills: data[3]
            };
            console.log('return data:' + JSON.stringify(userData));
            rpcRes.success = true;
            rpcRes.value = 'Get user profile';
            rpcRes.data = userData;
            callback(null, rpcRes);

        } else {
            rpcRes.success = false;
            rpcRes.value = 'Get user profile failed';
            callback(null, rpcRes);
        }
    });
};

profileService.createProfile = function(msg, callback){
    var sql = '';

    switch (msg.type)
    {
        case 'summary': sql = 'INSERT INTO summary (user_id, content) VALUES (' + msg.user_id + ',' + msg.content + ')'; break;
        case 'education': sql = 'INSERT INTO education (user_id, school, major, degree, start_date, end_date, description) VALUES (' + msg.user_id + ',' + msg.school + ',' + msg.major + ',' + msg.degree + ',' + msg.start_date + ',' + msg.end_date + ',' + msg.description + ')'; break;
        case 'experience': sql = 'INSERT INTO experience (user_id, company, title, start_date, end_date, description) VALUES (' + msg.user_id + ',' + msg.company + ',' + msg.title + ',' + msg.start_date + ',' + msg.end_date + ',' + msg.description + ')'; break;
        case 'skills': sql = 'INSERT INTO skills (user_id, tag_name, description) VALUES (' + msg.user_id + ',' + msg.tag_name + ',' + msg.description + ')'; break;
        case 'connections': sql = 'INSERT INTO connections (user_id, other_id, status) VALUES (' + msg.user_id + ',' + msg.tag_name + ',' + msg.status + ')'; break;
    }

    mysql.query(sql, function (err, data) {
        if (!err) {
            rpcRes.value = 'Create profile success';
            callback(null, rpcRes);

        } else {
            rpcRes.success = false;
            rpcRes.value = 'Create profile failed';
            callback(null, rpcRes);
        }
    });
};

profileService.editProfile = function(msg, callback){
    var sql = '';
    if (msg.type === 'summary') {
        sql = 'UPDATE summary SET summary_id=' + msg.summary_id + ',' + 'content=' + msg.content;
    }
    if (msg.type === 'education') {
        sql = 'UPDATE education SET edu_id=' + msg.edu_id + ',' + 'school=' + msg.school + 'major=' + msg.major + 'degree=' + msg.degree + 'start_date=' + msg.start_date + 'end_date=' + msg.end_date + 'description=' + msg.description;
    }
    if (msg.type === 'experience') {
        sql = 'UPDATE experience SET experience_id=' + msg.experience_id + ',' + 'company=' + msg.company + 'title=' + msg.title + 'start_date=' + msg.start_date + 'end_date=' + msg.end_date + 'description=' + msg.description;
    }
    if (msg.type === 'skills') {
        sql = 'UPDATE skills SET skills_id=' + msg.skills_id + ',' + 'tag_name=' + msg.tag_name + 'description=' + msg.description;
    }
    if (msg.type === 'connections') {
        sql = 'UPDATE connections SET user_id=' + msg.user_id + ',' + 'other_id=' + msg.other_id + 'status=' + msg.status;
    }

    mysql.query(sql, function (err, data) {
        if (!err) {
            rpcRes.value = 'Update profile success';
            callback(null, rpcRes);

        } else {
            rpcRes.success = false;
            rpcRes.value = 'Update profile failed';
            callback(null, rpcRes);
        }
    });
};

profileService.createProfile = function(msg, callback){
    var sql = '';

    switch (msg.type)
    {
        case 'summary': sql = 'DELETE FROM summary DELETE WHERE summary_id=' + msg.summary_id; break;
        case 'education': sql = 'DELETE FROM education DELETE WHERE edu_id=' + msg.edu_id; break;
        case 'experience': sql = 'DELETE FROM experience DELETE WHERE experience_id=' + msg.experience_id; break;
        case 'skills': sql = 'DELETE FROM skills DELETE WHERE skills_id=' + msg.skills_id; break;
        case 'connections': sql = 'DELETE FROM connections DELETE WHERE user_id=' + msg.user_id + ' AND ' + 'other_id=' + msg.other_id; break;
    }

    mysql.query(sql, function (err, data) {
        if (!err) {
            rpcRes.value = 'Delete profile success';
            callback(null, rpcRes);

        } else {
            rpcRes.success = false;
            rpcRes.value = 'Delete profile failed';
            callback(null, rpcRes);
        }
    });
};

module.exports = profileService;