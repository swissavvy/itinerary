/**
 * Created by Liv on 15/10/30.
 */
appControllers.controller('loginCtrl', function ($scope, $location, $http, userService) {
    $scope.loginForm = {
        username: "",
        password: ""
    };

    $scope.login = function () {
        var params = {
            identity: $scope.loginForm.username,
            password: $scope.loginForm.password
        };

        userService.login($scope.loginForm.username, $scope.loginForm.password).then(function(user){
            $scope.navigateTo('app.siteList');
        }, function(msg){
            alert(msg);
        });
    };
})
.controller('signUpCtrl', function ($scope, $location, userService) {
    $scope.signUpForm = {
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    };

    $scope.signUp = function () {
        userService.register($scope.signUpForm.username, $scope.signUpForm.password, $scope.signUpForm.email).then(function(){
            $scope.navigateTo('app.siteList');
        }, function(msg){
            alert(msg);
        });
    };
});