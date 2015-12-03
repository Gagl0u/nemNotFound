'use strict';

var module = angular.module('NNF.controller.populations', [
    'NNF.services.test'
]);

module.controller('PopulationsCtrl', ['$routeParams', '$location',
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