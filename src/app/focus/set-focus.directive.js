(function () {
    'use strict';

    /**
     * Directive qui met le focus sur un élément selon une condition, en manipulant le DOM.
     * La condition doit être inscrite comme valeur de l'attribut, par exemple:
     * <button set-focus="{{ ::vm.methodeRetournantBooleen() }}"></button>
     * 
     * Le one-time binding :: est utilisé pour éviter de surveiller constamment la valeur de l'expression,
     * ce qui serait superflu et causerait une perte (minime, mais réelle) de performance.
     */
    angular
        .module('focus.setFocusDirective', [])
        .directive('setFocus', setFocus);

    /**
     * Définit une directive qui met le focus sur un élément selon une condition, en manipulant le DOM.
     */
    function setFocus() {
        var directive = {
            link: link,
            // la directive doit être utilisée comme attribut d'un élément existant
            restrict: 'A'
        };

        return directive;

        /**
         * Permet de manipuler le DOM.
         * 
         * Ce commentaire JSDoc utilise les déclarations de types TypeScript installées comme paquets npm et spécifiées
         * dans package.json pour identifier des types. Ceci permet d'avoir l'Intellisense sur l'API d'Angular dans
         * Visual Studio Code, et de naviguer dans ces références avec « F12 Atteindre la définition ».
         * @param {angular.IScope} scope Scope de l'élément.
         * @param {JQLite} element Élément HTML enveloppé dans un objet jQLite.
         * @param {angular.IAttributes} attrs Attributs de l'élément HTML.
         */
        function link(scope, element, attrs) {
            if (attrs.setFocus === '' || attrs.setFocus === 'true') {
                element[0].focus();
            }
        }
    }
}());