'use strict';

var module = angular.module('NNF.controller.secouristes', [
    'NNF.services.test'
]);

module.controller('SecoursCtrl', ['$routeParams', '$location',
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