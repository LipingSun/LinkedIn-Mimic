(function () {
    var app = angular.module('ng-home', []);
    console.log("Angular good!");

    app.controller('bodyController', ['$http', function ($http) {
        var bodyCtrl = this;
        //this.add = {};
        $http.get('/home/user').success(function (data, status, headers, config, next) {
            console.log(data);
            bodyCtrl.user = data;
        });
        this.signout = function () {
            $http.get('/signout').success(function (data, status, headers, config) {
                console.log(data);
                window.location.assign(headers().location);
            });
        };
        this.addEducation = function () {
            //$http.post('/home/user/add').success(function (data, status, headers, config) {

            bodyCtrl.user.education.push(bodyCtrl.add.education);
            bodyCtrl.add.education = null;

            //})
        };
        this.searchMember = function () {
            $http.get('/search?name=' + bodyCtrl.searchName).success(function (data, status, headers, config) {
                console.log("GET data");
                if (data.success) {
                    console.log(data.users);
                    bodyCtrl.foundUsers = data.users;
                }
            });
        };
    }]);
})();