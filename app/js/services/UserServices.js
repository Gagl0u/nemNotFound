'use strict';

var module = angular.module('NNF.services.users', [
    'ngResource'
]);

module.factory('UsersService', ['$resource', 
    function ($resource) {
        return $resource('http://nuitinfo2015-nemnotfound.azurewebsites.net/api/users', {}, {
            get: {
                method: 'GET',
                url: 'http://nuitinfo2015-nemnotfound.azurewebsites.net/api/users/:login/:pwd'
            },
            exists: {
                method: 'GET',
                url: 'http://nuitinfo2015-nemnotfound.azurewebsites.net/api/users/:id'
            }
        });
    }
]);