'use strict';

/* App Module */

var app = angular.module('NNF', [
    'ngResource',
    'ngRoute',
    'NNF.services.test',
    'NNF.controller.test'
]);

app.config(
    function ($routeProvider) {
        $routeProvider
            .when('/test/:testId', {
                templateUrl: 'app/partials/view1/view1.html',
                controller: 'TestCtrl',
                controllerAs: 'testCtrl'
            })
            .otherwise({
                redirectTo: 'index.html'
            });
    }
    );