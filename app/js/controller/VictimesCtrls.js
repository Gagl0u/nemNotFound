'use strict';

var module = angular.module('NNF.controller.victimes', [
    'NNF.services.test'
]);

module.controller('VictimesCtrl', ['$routeParams', '$location',
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