(function () {
    'use strict';

    angular
        // @ts-ignore
        .module('app.focus.formulaireComponent', [])
        .component('formulaire', {
            templateUrl: 'focus/formulaire.html',
            controller: FormulaireController,
            controllerAs: 'vm',
            bindings: {
                codePostal: '<',
                nom: '<',
                nomInitial: '=?'
            }
        });
    
    function FormulaireController() {
        var vm = this;
        vm.rechercheNonVide = rechercheNonVide;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.assignerNom = assignerNom;

        function rechercheNonVide() {
            return Boolean(vm.nom) || Boolean(vm.codePostal);
        }

        function onInit() {
            //
        }

        function onChanges(changements) {
            //
        }

        function assignerNom() {
            vm.nom = vm.nomInitial;
        }
    }
}());