(function () {
    var app = angular.module('ng-home', []);
    console.log("Angular good!");
    var user = {
        name: {
            firstname: 'abc',
            lastname: '222'
        },
        summary: {
            content: 'This is sammary'
        },
        education: [
            {
                school: "sjsu",
                major: 'se',
                degree: 'master'
            },
            {
                school: "sjsu",
                major: 'se',
                degree: 'master'
            }
        ]
    };

    app.controller('bodyController', [function () {
        this.user = user;

    }]);

    //app.controller('SignInFormController', ['$http', function ($http) {
    //    this.signinform = {};
    //    this.submit = function () {
    //        console.log('signin submit');
    //        if (this.signinform !== {}) {
    //            console.log(this.signinform);
    //            $http.post('/signin', this.signinform).success(function (data, status, headers, config) {
    //                window.location.assign(headers().location);
    //            });
    //        }
    //    }
    //}]);

    //app.controller('SignUpFormController', ['$http', function ($http) {
    //    console.log("SignUpFormCtrl good!");
    //    this.signupform = {};
    //    this.submit = function () {
    //        console.log('submit good!');
    //        if (this.signupform !== {}) {
    //            console.log(this.signupform);
    //
    //            $http.post('/signup', this.signupform).success(function (res) {
    //                console.log(res);
    //            });
    //        }
    //    };
    //}]);

    //app.controller('TestController', ['$http', function ($http) {
    //    console.log('first');
    //    $http.get('/home').success(function (res) {
    //        console.log('Session');
    //        this.log = res.session;
    //        console.log(res.session);
    //    });
    //}]);
})();