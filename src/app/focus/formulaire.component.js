(function () {
    'use strict';

    /**
     * Component qui représente un formulaire utilisant une directive pour mettre le focus sur un élément.
     * Contrairement aux indications du AngularJS Style Guide, on définit le module et la composante
     * dans le même fichier, afin de favoriser la réutilisation.
     * 
     * En JavaScript moderne (ECMAScript 2015), chaque fichier représente un module.
     */
    angular
        .module('focus.formulaireComponent', [ 'focus.setFocusDirective' ])
        .component('formulaire', {
            templateUrl: 'formulaire.html',
            controller: FormulaireController,
            controllerAs: 'vm',
            bindings: {
                codePostal: '<',
                nom: '<'
            }
        });
    
    function FormulaireController() {
        var vm = this;
        vm.rechercheNonVide = rechercheNonVide;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;

        function rechercheNonVide() {
            return Boolean(vm.nom) || Boolean(vm.codePostal);
        }

        function onInit() {
            //
        }

        function onChanges(changements) {
            //
        }
    }
}());