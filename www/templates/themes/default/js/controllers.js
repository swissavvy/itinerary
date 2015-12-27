/**
 * Created by Liv on 15/10/30.
 */
appControllers.controller('loginCtrl', function ($scope, $location) {
    $scope.loginForm = {
        username: "",
        password: ""
    };

    $scope.login = function () {
        $scope.navigateTo('app.siteList');
    };
})
.controller('signUpCtrl', function ($scope, $location) {
    $scope.signUpForm = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
    };

    $scope.signUp = function () {
        $scope.navigateTo('app.siteList');
    };
})