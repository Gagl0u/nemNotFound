'use strict';

/* App Module */

var app = angular.module('NNF', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'ui-notification',
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
            .when('/secouristes/:secouristeId', {
                templateUrl: 'app/partials/secouristes/secouristesDetail.html',
                controller: 'SecoursDetailCtrl',
                controllerAs: 'secoursDetailCtrl'
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