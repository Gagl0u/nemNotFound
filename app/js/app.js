'use strict';

/* App Module */

var app = angular.module('NNF', [
    'ngRoute',
    'ui-bootstrap',
    'NNF.ctrl.test',
    'NNF.services.test'
]);

app.config(
    ['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/test/:testId', {
                    templateUrl: 'app/partials/view1/view1.html',
                    controller: 'TestCtrl',
                    controllerAs: 'testCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]
);