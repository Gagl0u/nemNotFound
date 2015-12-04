'use strict';

var module = angular.module('NNF.controller.fiches', [
    'NNF.services.users',
    'ui-notification',
    'ui.bootstrap'
]);

module.controller('FicheCtrl', ['$routeParams', '$location',
    'UsersService', 'Notification', '$uibModal', '$scope',
    function ($routeParams, $location, UsersService, Notification,
        $uibModal, $scope) {
        var that = this;
        this.SecouristeId = $routeParams.secouristeId;
        this.criseId = $routeParams.criseId;

        this.fiches = [{
            "name": "Yvan Callaoun",
            "adress": "rue des rosiers",
            "description": "un beau gosse auvergnat"
        }, {
                "name": "Christophe Ha",
                "adress": "rue des saint-jacques",
                "description": "un nem comme on les aimes"
            }, {
                "name": "Arthur Le Dref",
                "adress": "avenue de versailles",
                "description": "un bobo de la brousse"
            }, {
                "name": "Boris Pasquier",
                "adress": "Chatillon",
                "description": "Boris le vegan"
            }];

        this.newFiche = function () {
            var modalInstance = $uibModal.open({
                animation: "true",
                templateUrl: 'fiche.modal.html',
                controller: 'FicheModalCtrl as ficheModalCtrl',
                size: 'lg',
                resolve: {
                }
            });

            modalInstance.result.then(function (obj) {
                that.fiches.push(obj);
            });
        }

        this.init = function () {
        }

        this.init();
    }
]);


module.controller('FicheModalCtrl', ['$uibModalInstance', function ($uibModalInstance) {

    var that = this;
    this.name = "";
    this.adress = "";
    this.description = "";

    this.ok = function () {
        if (this.name.trim().length < 1 && this.adress.trim().length < 1 && this.description.trim().length < 1) {
            alert('Des éléments sont manquants!');
        } else {
            var obj = {};
            obj.name = this.name;
            obj.adress = this.locadressation;
            obj.description = this.description;
            $uibModalInstance.close(obj);
        }
    }

}
]);