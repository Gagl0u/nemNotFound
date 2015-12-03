'use strict';

/* App Module */

var app = angular.module('NNF', [
    'ngResource',
    'ngRoute',
    'NNF.services.test',
    'NNF.controller.proches',
    'NNF.controller.victimes',
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
            .when('/victimes', {
                templateUrl: 'app/partials/victimes/victimes.html',
                controller: 'VictimesCtrl',
                controllerAs: 'victimesCtrl'
            })
            .when('/proches', {
                templateUrl: 'app/partials/proches/proches.html',
                controller: 'ProchesCtrl',
                controllerAs: 'prochesCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
    );