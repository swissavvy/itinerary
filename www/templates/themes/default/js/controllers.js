/**
 * Created by Liv on 15/10/30.
 */
appControllers.controller('loginCtrl', function ($scope, $location, $http, userService, $rootScope) {
    $scope.loginForm = {
        username: "",
        password: ""
    };

    $scope.login = function () {
        $rootScope.show('正在登录');
        userService.login($scope.loginForm.username, $scope.loginForm.password).then(function(user){
            $rootScope.hide();
            $rootScope.user = userService.userInfo;
            $scope.navigateTo('app.siteList');
        }, function(msg){
            $rootScope.hide();
            alert(msg);
        });
    };
})
.controller('signUpCtrl', function ($scope, $location, userService, $rootScope) {
    $scope.signUpForm = {
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    };

    $scope.signUp = function () {
        $rootScope.show('正在注册');
        userService.register($scope.signUpForm.username, $scope.signUpForm.password, $scope.signUpForm.email).then(function(){
            $rootScope.hide();
            $rootScope.user = userService.userInfo;
            $scope.navigateTo('app.siteList');
        }, function(msg){
            alert(msg);
        });
    };
});