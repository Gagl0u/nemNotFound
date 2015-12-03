'use strict';

var module = angular.module('NNF.services.test', [
    'ngResource'
]);

module.factory('TestService', ['$resource',
    function ($resource) {
        return $resource('http://nuitinfo2015-nemnotfound.azurewebsites.net/', {}, {
            list: {
                metod: 'GET',
                url: 'http://test.com/accountDomains',
                isArray: true
            },
            get: {
                method: 'GET'
            }
        });
    }
]);