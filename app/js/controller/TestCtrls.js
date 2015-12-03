'use strict';

var module = angular.module('NNF.ctrl.test', [
    'ui.bootstrap',
    'NNF.services.test'
]);

module.controller('TestCtrl', ['$routeParams', '$location',
'testService',
    function($routeParams, $location, testService) {
        var that = this;
        this.id=$routeParams.testId;
        
    }
]);