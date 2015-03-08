(function () {
    var app = angular.module('myApp', []);
//                angular.module('myApp', []).controller('signInFormController', function ($scope, $http) {
//                    $scope.submit = function() {
//                        console.log("good");
//                        $http.post("http://localhost:3000/signin", $scope.signin).success(function(res) {
//                            console.log(res);
//                            $scope.response=res;
//                        });
//                    }
//                });

    app.controller('signUpFormController', ['$scope', '$http', function ($scope, $http) {
        $scope.submit = function () {
            $http.post("http://localhost:3000/signup", $scope.signup).success(function (res) {
                console.log(res);
                $scope.response = res;
            });
        }
    }]);
})();