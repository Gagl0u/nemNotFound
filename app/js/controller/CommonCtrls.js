'use strict';

var module = angular.module('NNF.controller.commons', [
    'NNF.services.users',
    'ui-notification',
    'ui.bootstrap'
]);

module.controller('CriseDetailCtrl', ['$routeParams', '$location',
    'UsersService', 'Notification', '$uibModal', '$scope',
    function ($routeParams, $location, UsersService, Notification,
        $uibModal, $scope) {
        var that = this;
        this.SecouristeId = $routeParams.secouristeId;
        this.criseId = $routeParams.criseId;

        //for test purpose
        this.crises = [
            {
                "id": 1,
                "name": "Crise1",
                "location": "Lilongwe",
                "beginDate": "11/09/10",
                "informations": "blablablablablablablablablablablablablablablablablabla, blablablablablablablablablablablablabla",
                "lat": -13.9632306,
                "long": 33.7118474
            },
            {
                "id": 2,
                "name": "Crise2",
                "location": "Paris",
                "beginDate": "13/09/15",
                "informations": "blablablablablablablablablablablablablablablablablabla, blablablablablablablablablablablablabla",
                "lat": 48.8589506,
                "long": 2.2773456
            },
            {
                "id": 3,
                "name": "Crise3",
                "location": "New York",
                "beginDate": "09/11/10",
                "informations": "blablablablablablablablablablablablablablablablablabla, blablablablablablablablablablablablabla",
                "lat": 40.7058249,
                "long": -74.1184305
            },
            {
                "id": 4,
                "name": "Crise4",
                "location": "Hong Kong",
                "beginDate": "25/02/09",
                "informations": "blablablablablablablablablablablablablablablablablabla, blablablablablablablablablablablablabla",
                "lat": 22.3579352,
                "long": 113.980589
            },
            {
                "id": 5,
                "name": "Crise5",
                "location": "Brasilia",
                "beginDate": "03/10/14",
                "informations": "blablablablablablablablablablablablablablablablablabla, blablablablablablablablablablablablabla",
                "lat": -15.7213868,
                "long": -48.0786645
            }
        ];

        this.crise = this.crises[parseInt(this.criseId) - 1];


        this.Paris = {
            lat: 52.52,
            lng: 13.40,
            zoom: 14
        };
        this.layers = {
            baselayers: {
                googleTerrain: {
                    name: 'Google Terrain',
                    layerType: 'TERRAIN',
                    type: 'google'
                },
                googleHybrid: {
                    name: 'Google Hybrid',
                    layerType: 'HYBRID',
                    type: 'google'
                },
                googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                }
            }
        };
        this.defaults = {
            scrollWheelZoom: false
        };


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
                    $location.path('#/');
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
                                }
                            },
                            function (httpResponse) {
                            });
                    }
                }
            } else {
                this.user = null;
            }
        }

        this.initialize = function () {
            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: new google.maps.LatLng(that.crise.lat, that.crise.long),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(mapCanvas, mapOptions)
        }

        this.init = function () {
            this.exists();
            this.initialize();
            google.maps.event.addDomListener(window, 'load', this.initialize);
        }

        this.init();
    }
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
                "id": 1,
                "name": "Crise1",
                "location": "Malawi",
                "beginDate": "11/09/10"
            },
            {
                "id": 2,
                "name": "Crise2",
                "location": "Paris",
                "beginDate": "13/09/15"
            },
            {
                "id": 3,
                "name": "Crise3",
                "location": "New York",
                "beginDate": "09/11/10"
            },
            {
                "id": 4,
                "name": "Crise4",
                "location": "Hong Kong",
                "beginDate": "25/02/09"
            },
            {
                "id": 5,
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

        this.redirect = function (id) {
            var path = $location.path();
            $location.path(path + "/" + id);
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