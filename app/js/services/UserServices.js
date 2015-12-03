'use strict';

var module = angular.module('NNF.services.users', [
    'ngResource'
]);

module.factory('UsersService', ['$resource',
    function ($resource) {
        return $resource('http://nuitinfo2015-nemnotfound.azurewebsites.net/api/', {}, {
            get: {
                method: 'GET',
				url: 'http://nuitinfo2015-nemnotfound.azurewebsites.net/api/:login/:pwd'
            }
        });
    }
]);