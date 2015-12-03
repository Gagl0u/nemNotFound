'use strict';

var module = angular.module('NNF.services.test', [
    'ngResource'
]);

module.factory('testService', ['$resource',
    function (config, $resource) {
        return $resource('http://test.com/', {}, {
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