'use strict';

var module = angular.module('NNF.controller.secouristes', [
    'NNF.services.users'
]);

module.controller('SecoursCtrl', ['$routeParams', '$location',
    'UsersService',
    function ($routeParams, $location, UsersService) {
        var that = this;

        this.connect = function () {
            if (this.login == null || this.password == null) {
                return true;
            } else if (this.login.trim().length < 1 || this.password.trim().length < 1) {
                return false;
            } else {
                UsersService.get({
                    login: that.login,
                    pwd: that.password
                }, {},
                    function (data) {
                        if (data == null) {
                            return false;
                        }
                    },
                    function (httpResponse) {

                    });
            }
        }
    }
]);