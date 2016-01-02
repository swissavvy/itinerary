/**
 * Created by Liv on 15/10/30.
 */
appControllers.controller('loginCtrl', function ($scope, $location, $http) {
    $scope.loginForm = {
        username: "",
        password: ""
    };

    $scope.login = function () {
        var params = {
            identity: $scope.loginForm.username,
            password: $scope.loginForm.password
        };
        $http.post(window.globalVariable.apiDomain + '/api/user/login', params).success(function(result){
            if(result.status == 1){
                $scope.navigateTo('app.siteList');
            }
        });
    };
})
.controller('signUpCtrl', function ($scope, $location, $http) {
    $scope.signUpForm = {
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    };

    $scope.signUp = function () {
        var params = {};
        $http.post(window.globalVariable.apiDomain + '/api/user/register', params).success(function(){

        });

        $scope.navigateTo('app.siteList');
    };
})