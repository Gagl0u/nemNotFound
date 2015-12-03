'use strict';

/* App Module */

var app = angular.module('NNF', [
    'ngResource',
    'ngRoute',
    'NNF.services.test',
    'NNF.services.users',
    'NNF.controller.populations',
    'NNF.controller.secouristes'
]);

app.config(
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/partials/default.html'
            })
            .when('/secouristes', {
                templateUrl: 'app/partials/secouristes/secouristes.html',
                controller: 'SecoursCtrl',
                controllerAs: 'secoursCtrl'
            })
            .when('/populations', {
                templateUrl: 'app/partials/populations/populations.html',
                controller: 'PopulationsCtrl',
                controllerAs: 'populationsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
    );