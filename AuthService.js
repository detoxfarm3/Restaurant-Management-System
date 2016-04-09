var Apis = require('./Apis');
var Promise = require('bluebird');
var ee = require('./EventEmitter');
var Events = require('./Events');
var $ = require('jquery');
//var jwt = require('jsonwebtoken');

var token = null;
var user = null;

class AuthService {

    login(credentials) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: Apis.LOGIN_URI,
                data: JSON.stringify(credentials),
                method: 'post',
                success: function (tkn) {
                    console.log("login.tkn", tkn);
                    token = tkn;

                    //user = jwt.decode(token);
                    user = JSON.parse(tkn);

                    resolve(user);

                    console.log("LOGIN_SUCCESS", JSON.stringify({token: token, user: user}));
                },
                error: reject
            });
        });
    }

    logout() {
        token = null;
        user = null;
        return new Promise(function (resolve, reject) {
            console.log("AuthService.LOgout");
            resolve("ok");
            //$.ajax({
            //    url: Apis.LOGOUT_URI,
            //    success: function (tkn) {
            //        console.log("logout.tkn", tkn);
            //
            //        resolve(true);
            //    },
            //    error: reject
            //});
        });
    }

    isLoggedIn() {
        return !!token;
    }

    currentUser() {
        return user;
    }

    authToken() {
        return token;
    }
}

module.exports = new AuthService();