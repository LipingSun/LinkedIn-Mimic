(function () {
    var app = angular.module('myApp', []);
    console.log("Angular good!");

    app.controller('SignInFormController', ['$http', function ($http) {
        this.signinform = {};
        this.submit = function () {
            console.log('signin submit');
            if (this.signinform !== {}) {
                console.log(this.signinform);
                $http.post('/signin', this.signinform).success(function (data, status, headers, config) {
                    window.location.assign(headers().location);
                });
            }
        }
    }]);

    app.controller('SignUpFormController', ['$http', function ($http) {
        console.log("SignUpFormCtrl good!");
        this.signupform = {};
        this.submit = function () {
            console.log('submit good!');
            if (this.signupform !== {}) {
                console.log(this.signupform);

                $http.post('/signup', this.signupform).success(function (res) {
                    console.log(res);
                });
            }
        };
    }]);

    app.controller('TestController', ['$http', function ($http) {
        console.log('first');
        $http.get('/home').success(function (res) {
            console.log('Session');
            this.log = res.session;
            console.log(res.session);
        });
    }]);
})();