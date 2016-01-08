/**
 * Created by Liv on 16/1/8.
 */
appControllers.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
