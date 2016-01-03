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
    };

    /**
     * 登录
     * @param username
     * @param password
     * @returns {deferred.promise|{then, catch, finally}}
     */
    this.login = function(username, password){
        var deferred = $q.defer();
        var userService = this;

        var params = {
            identity: username,
            password: password
        };

        $http.post(window.globalVariable.apiDomain + '/api/user/login', params).success(function(result){
            if(result.status == 1){
                userService.setUserInfo(result.data[0]);
                deferred.resolve(this.userInfo);
            }else{
                deferred.reject(result.msg);
            }
        }).error(function(){
            deferred.reject('登录失败');
        });

        return deferred.promise;
    };

    /**
     *
     * @param username
     * @param password
     * @param email
     * @returns {deferred.promise|{then, catch, finally}}
     */
    this.register = function(username, password, email){
        var deferred = $q.defer();
        var userService = this;

        /**
         *
         * @type {{username: *, password: *, email: *}}
         */
        var params = {
            username: username,
            password: password,
            email: email
        };

        $http.post(window.globalVariable.apiDomain + '/api/user/register', params).success(function(result){
            if(result.status == 1){
                userService.setUserInfo(result.data[0]);
                deferred.resolve(this.userInfo);
            }else{
                deferred.reject(result.msg);
            }
        }).error(function(){
            deferred.reject('注册失败');
        });

        return deferred.promise;
    }
});
