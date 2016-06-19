/**
 * Created by Liv on 15/10/18.
 */
appControllers.controller('myBookingCtrl', function ($scope, $filter, userService) {

    var TYPE_ALL = 0;
    var TYPE_HOTELS = 1;
    var TYPE_FLIGHTS = 2;
    var TYPE_SITE = 3;
    var items = [];

    userService.getCollects().then(function(list){
        items = list;
        $scope.items = items;
    }, function(msg){
        console.log(msg);
    });

    $scope.searchList = function (type) {
        if(type == TYPE_ALL){
            $scope.items = items;
        }else{
            $scope.items = $filter('filter')(items, {type: type});
        }
    };

    $scope.items = items;
})

.controller('siteCtrl', function ($scope, $stateParams, $filter, $http, $mdBottomSheet, $sce) {
    var id = $stateParams.id;
    $http.get(window.globalVariable.apiDomain + '/api/site/view', {params: {id: id}}).success(function (result) {
        $scope.site = result.data;
        console.log($scope.site);
    });

    $scope.center_position = {
        lat: 43.07493,
        lng: -89.381388
    };

    // sharedProduct fro show shared social bottom sheet by calling sharedSocialBottomSheetCtrl controller.
    $scope.sharedProduct = function ($event, product) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetCtrl',
            targetEvent: $event,
            locals: {
                product: product
            }
        });
    };// End sharedProduct.

    $scope.startMp3 = function(){
        var oAudio = document.getElementById('audio');
        var iconMp3 = document.getElementById('btn-mp3-icon');
        // Tests the paused attribute and set state.
        if (oAudio.paused) {
            oAudio.play();
            iconMp3.className = 'ion-close-round';
        }
        else {
            oAudio.pause();
            iconMp3.className = 'ion-arrow-right-b';
        }
    }
})

// Controller of share social bottom sheet.
.controller('sharedSocialBottomSheetCtrl', function ($scope, $mdBottomSheet, $timeout, product, $mdToast, $cordovaSocialSharing) {

    // This function is the first activity in the controller.
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {

        //$scope.setCanvasImage for set canvas image to save to your mobile gallery.
        $scope.setCanvasImage(product.cover);
        //$scope.isSaving is image saving status.
        $scope.isSaving = false;
    };// End initialForm.

    //setCanvasImage for set canvas image to save to your mobile gallery.
    $scope.setCanvasImage = function (imgPath) {
        // create canvas image.
        var canvas = document.getElementById('imgCanvas');
        var context = canvas.getContext('2d');
        var imageObj = new Image();

        imageObj.onload = function () {
            canvas.height = this.height;
            canvas.width = this.width;
            context.drawImage(imageObj, 0, 0);
        };
        //image path.
        imageObj.src = imgPath;

        return canvas.toDataURL();
    };// End setCanvasImage.

    // getCanvasImageUrl for get canvas image path.
    $scope.getCanvasImageUrl = function () {
        var canvas = document.getElementById('imgCanvas');
        return canvas.toDataURL();
    };// End getCanvasImageUrl.

    // sharedFacebook for share product picture to facebook by calling $cordovaSocialSharing.
    $scope.sharedFacebook = function () {
        console.log($cordovaSocialSharing.shareViaFacebook);
        $cordovaSocialSharing.shareViaFacebook(" ", $scope.getCanvasImageUrl());
        $mdBottomSheet.hide();
    }// End sharedFacebook.

    // sharedTwitter for share product picture to twitter by calling $cordovaSocialSharing.
    $scope.sharedTwitter = function () {
        $cordovaSocialSharing.shareViaTwitter(" ", $scope.getCanvasImageUrl());
        $mdBottomSheet.hide();
    }// End sharedTwitter.

    // sharedMail for share product picture to email by calling $cordovaSocialSharing.
    $scope.sharedMail = function () {
        $cordovaSocialSharing.shareViaEmail(" ", "Shopping with ionic meterial", "ionicmaterialdesign@gmail.com", "cc@IonicMeterial.com", "bcc@IonicMeterial.com", $scope.getCanvasImageUrl());
        $mdBottomSheet.hide();
    }// End sharedMail.

    // saveImage for save product picture to mobile gallery.
    $scope.saveImage = function () {

        if ($scope.isSaving == false) {
            try {
                // calling canvas2ImagePlugin to save image to gallery.
                window.canvas2ImagePlugin.saveImageDataToLibrary(
                    function (msg) {

                    },
                    function (err) {
                        throw err;
                    },
                    document.getElementById('imgCanvas'));
                $scope.isSaving = true;

                // show Image Saved ! toast when save image success.
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: "Image Saved !"
                        }
                    }
                });
            }
            catch (e) {
                console.log(e);
                // show Save Failed : Please try again! toast when save image  is error.
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: "Save Failed : Please try again!"
                        }
                    }
                });
            }
        }
        // Hide bottom sheet.
        $timeout(function () {
            $mdBottomSheet.hide();
        }, 1800);
    }// End saveImage.

    // sharedMore for hide bottom sheet.
    $scope.sharedMore = function () {

        $mdBottomSheet.hide();
    }// End sharedMore.

    $scope.initialForm();
})// End of share social bottom sheet controller.

.controller('siteListCtrl', function ($scope, $location, userService, attractionService, $stateParams) {
    $scope.items = [];

    attractionService.getAttractions($stateParams.categoryId).then(function(result){
        $scope.items = result;
    }, function(msg){
        console.log(msg);
    });

    $scope.addCollect = function(item, $event){
        $event.stopPropagation();

        userService.addCollect(item.id).then(function(){
            item.isCollect = 1;
            item.collect_id = result.collect_id;
        }, function(msg){
            alert(msg);
        });
    };

    $scope.deleteCollect = function(item, $event){
        $event.stopPropagation();

        userService.deleteCollect(item.collectId).then(function(){
            item.isCollect = 0;
        }, function(msg){
            alert(msg);
        });
    };

    $scope.redirect = function (url) {
        $location.path(url)
    };
})

.controller('MapsCtrl', function($scope, $ionicLoading) {

    $scope.info_position = {
        lat: 43.07493,
        lng: -89.381388
    };

    $scope.center_position = {
        lat: 43.07493,
        lng: -89.381388
    };

    $scope.my_location = "";

    $scope.$on('mapInitialized', function(event, map) {
        $scope.map = map;
    });

    $scope.centerOnMe= function(){

        $scope.positions = [];

        $ionicLoading.show({
            template: 'Loading...'
        });

        // with this function you can get the user’s current position
        // we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.current_position = {lat: pos.G,lng: pos.K};
            $scope.my_location = pos.G+", "+pos.K;
            $scope.map.setCenter(pos);
            $ionicLoading.hide();
        });
    };

    $scope.centerOnMe();
});