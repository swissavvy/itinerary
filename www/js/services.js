/**
 * Created by Liv on 16/1/3.
 */
appServices.service('userService', function($q, $http){
    /**
     *
     * @type {{uid: int, username: string, avatar: string, email: string}| null}
     */
    this.userInfo = null;

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
    };

    /**
     *
     * @param id
     * @returns {deferred.promise|{then, catch, finally}}
     */
    this.addCollect = function(id){
        var deferred = $q.defer();

        $http.post(window.globalVariable.apiDomain + '/api/site/add-collect', {id: id, uid: this.userInfo.uid}).success(function(result){
            if(result.status == 1){
                deferred.resolve(result.data);
            }else{
                deferred.reject(result.msg);
            }
        }).error(function(){
            deferred.reject('收藏失败');
        });

        return deferred.promise;
    };

    /**
     *
     * @param id
     * @returns {deferred.promise|{then, catch, finally}}
     */
    this.deleteCollect = function(id){
        var deferred = $q.defer();

        $http.get(window.globalVariable.apiDomain + '/api/site/delete-collect', {params: {id: id}}).success(function(result){
            if(result.status == 1){
                deferred.resolve();
            }else{
                deferred.reject(result.msg);
            }
        }).error(function(){
            deferred.reject('删除收藏失败');
        });

        return deferred.promise;
    }
})

.service('attractionService', function($q, $http, userService){
    /**
     * 获取景点列表
     * @returns {deferred.promise|{then, catch, finally}}
     */
    this.getAttractions = function(categoryId){
        var deferred = $q.defer();
        var params = {};

        if(categoryId != 0){
            params.category_id = categoryId;
        }

        if(userService.userInfo){
            params.uid = userService.userInfo.uid;
        }

        $http.get(window.globalVariable.apiDomain + '/api/site/index', {params: params}).success(function (result) {
            if(result.status == 1){
                deferred.resolve(result.data);
            }else{
                deferred.reject(result.msg);
            }
        }).error(function(){
            deferred.reject('列表数据获取失败');
        });

        return deferred.promise;
    }
})

.service('categoryService', function($http, $q){
    var moduleId = 'sub-site';

    /**
     * 获取分类
     * @param parentId
     * @returns {deferred.promise|{then, catch, finally}}
     */
    this.getCategories = function(parentId){
        var deferred = $q.defer();

        $http.get(window.globalVariable.apiDomain + '/api/category/index', {params: {category_id: parentId, module: moduleId}}).success(function (result) {
            if(result.status == 1){
                deferred.resolve(result.data);
            }else{
                deferred.reject(result.msg);
            }
        }).error(function(){
            deferred.reject('列表数据获取失败');
        });

        return deferred.promise;
    }
});
