'use strict';

var module = angular.module('NNF.controller.commons', [
    'NNF.services.users',
    'ui-notification',
    'ui.bootstrap'
]);


module.controller('CriseCtrl', ['$routeParams', '$location',
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
            if ($location.path().indexOf('secouriste') > -1) {
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
            } else {
                this.user = null;
            }
        }

        this.newCrise = function () {

            var modalInstance = $uibModal.open({
                animation: "true",
                templateUrl: 'crise.modal.html',
                controller: 'CriseModalCtrl as criseModalCtrl',
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


module.controller('CriseModalCtrl', ['$uibModalInstance', function ($uibModalInstance) {

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