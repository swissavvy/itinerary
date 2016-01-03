/**
 * Created by Liv on 16/1/3.
 */
appServices.service('userService', function($q, $http){
    /**
     *
     * @type {{uid: int, username: string, avatar: string, email: string}}
     */
    this.userInfo = {};

    this.setUserInfo = function(data){
        this.userInfo.uid = data.id;
        this.userInfo.username = data.username;
        this.userInfo.avatar = data.avatar;
        this.userInfo.email = data.email;
    };

    /**
     * 获取收藏数据
     * @returns {deferred.promise|{then, catch, finally}}
     */
    this.getCollects = function(){
        var deferred = $q.defer();

        $http.get(window.globalVariable.apiDomain + '/api/user/collection', {params: {uid: this.userInfo.uid}}).success(function(result){
            if(result.status == 1){
                deferred.resolve(result.data);
            }else{
                deferred.reject(result.msg)
            }
        });

        return deferred.promise;
    }
});
