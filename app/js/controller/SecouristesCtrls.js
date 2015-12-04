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
                    $location.path(path + '/1');
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
                            $location.path(path + '/' + data.id);
                        },
                        function (httpResponse) {

                        });
                }
            }
        }
    }
]);

module.controller('SecoursDetailCtrl', ['$routeParams', '$location',
    'UsersService', 'Notification', '$uibModal',
    function ($routeParams, $location, UsersService, Notification,
        $uibModal) {
        var that = this;
        this.id = $routeParams.secouristeId;

        this.search = '';

        //for test purpose
        this.crises = [
            {
                "name": "Crise1",
                "location": "Malawi",
                "beginDate": "11/09/10"
            },
            {
                "name": "Crise2",
                "location": "Paris",
                "beginDate": "13/09/15"
            },
            {
                "name": "Crise3",
                "location": "New York",
                "beginDate": "09/11/10"
            },
            {
                "name": "Crise4",
                "location": "Hong Kong",
                "beginDate": "25/02/09"
            },
            {
                "name": "Crise5",
                "location": "Brasilia",
                "beginDate": "03/10/14"
            }
        ];

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
            if (angular.isNumber(this.id)) {
                $location.path('#/secouristes');
            } else {
                //to test without DB
                if (this.id == 1) {
                    this.user = {
                        login: "User1",
                        password: "User1"
                    };
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
        }

        this.newCrise = function () {

            var modalInstance = $uibModal.open({
                animation: "true",
                templateUrl: 'crise.modal.html',
                controller: 'CriseCtrl as criseCtrl',
                size: 'lg',
                resolve: {
                }
            });

            modalInstance.result.then(function (obj) {
                that.crises.push(obj);
            });
        };

        this.init = function () {
            this.exists();
        }

        this.init();
    }
]);


module.controller('CriseCtrl', ['$uibModalInstance', function ($uibModalInstance) {

    var that = this;
    this.name = "";
    this.location = "";

    this.ok = function () {
        if (this.name.trim().length < 1 && this.location.trim().length < 1 && this.beginDate == null) {
            alert('Des éléments sont manquants!');
        } else {
            var obj = {};
            obj.name = this.name;
            obj.location = this.location;
            obj.beginDate = this.beginDate.getDate() + '/' + this.beginDate.getMonth() + '/' + this.beginDate.getFullYear();
            $uibModalInstance.close(obj);
        }
    }

}
]);