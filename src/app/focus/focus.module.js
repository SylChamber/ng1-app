(function() {
    'use strict';

    /**
     * Module qui démontre une directive qui permet de faire le focus sur un élément selon une condition.
     * 
     * Ici, chaque composante (la directive et un component) sont définis dans leur propre module afin
     * de permettre plus de modularité et permettre leur utilisation sans dépendre de toute l'application.
     * 
     * Dans les applications JavaScript modernes (ECMAScript 2015), chaque fichier représente un module.
     */
    angular.module('focus', [
        'focus.setFocusDirective',
        'focus.formulaireComponent'
    ]);
})();