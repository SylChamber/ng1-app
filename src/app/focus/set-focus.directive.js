(function () {
    'use strict';

    angular
        .module('focus.setFocusDirective', [])
        .directive('setFocus', setFocus);

    function setFocus() {
        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attrs) {
            if (attrs.setFocus === '' || attrs.setFocus === 'true') {
                element[0].focus();
            }
        }
    }
}());