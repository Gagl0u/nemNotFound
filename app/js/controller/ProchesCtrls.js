'use strict';

var module = angular.module('NNF.controller.proches', [
    'NNF.services.test'
]);

module.controller('ProchesCtrl', ['$routeParams', '$location',
    'TestService',
    function ($routeParams, $location, testService) {
        var that = this;

        testService.get({},
            function (data) {

            },
            function (httpResponse) {

            });
    }
]);