/**
 * Created by Liv on 16/1/3.
 */
appServices.service('userService', function(){
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
    }
});
