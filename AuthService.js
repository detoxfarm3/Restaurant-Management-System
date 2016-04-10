var Apis = require('./Apis');
var Promise = require('bluebird');
var ee = require('./EventEmitter');
var Events = require('./Events');
var $ = require('jquery');
//var jwt = require('jsonwebtoken');

var localStorage = window.localStorage;

var token = null;
var user = null;
var date = null;
//Retrieve
if (!!localStorage) {

    date = !!localStorage.getItem("date") ? new Date(localStorage.getItem("date")) : null;

    if (!!date && date.getDate() == new Date().getDate()) {
        token = localStorage.getItem("token");
        user = localStorage.getItem("user");
        try {
            user = JSON.parse(user);
        } catch (e) {
            token = null;
            user = null;
        }
    }
}

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

                    //Store
                    if (!!localStorage) {
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("date", new Date().toJSON());
                    }
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

            if(!!localStorage) {
                localStorage.clear();
            }

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