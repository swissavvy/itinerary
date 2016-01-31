// Controller of menu toggle.
// Learn more about Sidenav directive of angular material
// https://material.angularjs.org/latest/#/demo/material.components.sidenav
appControllers.controller('menuCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state, userService, categoryService) {

    $scope.toggleLeft = buildToggler('left');
    // buildToggler is for create menu toggle.
    // Parameter :  
    // navID = id of navigation bar.
    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };// End buildToggler.

    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go
    $scope.navigateTo = function (stateName, params) {
        $timeout(function () {
            $mdSidenav('left').close();
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go(stateName, params);
        }, 200);
    };// End navigateTo.

    categoryService.getCategories(0).then(function (result) {
        $scope.categories = result;
    })

}); // End of menu toggle controller.