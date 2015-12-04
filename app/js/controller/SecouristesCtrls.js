'use strict';

var module = angular.module('NNF.controller.secouristes', [
    'NNF.services.users',
    'ui-notification',
]);

module.controller('SecoursCtrl', ['$routeParams', '$location',
    'UsersService', 'Notification',
    function ($routeParams, $location, UsersService, Notification) {
        var that = this;

        this.okValues = true;

        Notification.setOptions = {
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        };


        this.connect = function () {
            if (this.login == null || this.password == null) {
                Notification.error({ message: 'You must enter data to connect', title: '<i class="fa fa-exclamation-triangle"></i> Error' });
                this.okValues = false;
            } else if (this.login.trim().length < 1 || this.password.trim().length < 1) {
                Notification.error({ message: 'You must enter data to connect', title: '<i class="fa fa-exclamation-triangle"></i> Error' });
                this.okValues = false;
            } else {
                UsersService.get({
                    login: that.login,
                    pwd: that.password
                }, {},
                    function (data) {
                        if (data == null) {
                            Notification.error({ message: 'You must enter data to connect', title: '<i class="fa fa-exclamation-triangle"></i> Error' });
                            this.okValues = false;
                        }
                        $location.path('#/secouristes/' + data.id);
                    },
                    function (httpResponse) {

                    });
            }
        }
    }
]);

module.controller('SecoursDetailCtrl', ['$routeParams', '$location',
    'UsersService', 'Notification',
    function ($routeParams, $location, UsersService, Notification) {
        var that = this;
        this.id = $routeParams.secouristeId;

        Notification.setOptions = {
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        };


        this.exists = function () {
            if (isNan(this.id)) {
                $location.path('#/secouristes');
            } else {
                UsersService.exists({
                    id: that.id
                }, {},
                    function (data) {
                        if (data == null) {
                            $location.path('#/secouristes');
                        }
                    },
                    function (httpResponse) {
                        $location.path('#/secouristes');
                    });
            }
        }

        this.init = function () {

        }

        this.init();
    }
]);