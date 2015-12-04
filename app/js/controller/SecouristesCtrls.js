'use strict';

var module = angular.module('NNF.controller.secouristes', [
    'NNF.services.users',
    'ui-notification',
    'ui.bootstrap'
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
                if (this.login == "User1" && this.password == "User1") {
                    //to test without DB
                    var path = $location.path();
                    $location.path(path + '/1/crises');
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
                            var path = $location.path();
                            $location.path(path + '/' + data.id + '/crises');
                        },
                        function (httpResponse) {

                        });
                }
            }
        }
    }
]);