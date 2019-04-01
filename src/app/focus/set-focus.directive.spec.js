/**
 * Ces tests sur la directive setFocus ne correspondent pas à la technique standard de test de directive.
 * Ici, nous ne voulons pas tester le rendu HTML de la directive, mais son comportement. Nous allons donc
 * injecter la directive elle-même dans nos tests, plutôt que de compiler un rendu avec $compile selon
 * la technique répandue.
 * 
 * Normalement, pour une composante comme un service, on devrait regrouper tous les tests pour une méthode
 * spécifique (comme link testée ci-dessous) sous un describe. Toutefois, les tests pour notre directive
 * ne concerne que la méthode link. Il n'y a pas d'autre méthode à tester. Il est inutile d'ajouter
 * un niveau de regroupement.
 */
describe('setFocus directive', function () {
    beforeEach(function () {
        // D'ordinaire, on écrirait module('focus.setFocusDirective') plutôt que angular.mock.module tout au long.
        // (module étant un raccourci vers angular.mock.module, tout comme inject).
        // Mais module est un mot réservé dans Node.js; pour avoir l'Intellisense sur module dans VSCode,
        // il faut y référer au long  Sinon, VSCode interprète module comme du type NodeModule.
        // Ici, le paquet npm 'angular-mocks' dans package.json permet d'avoir l'Intellisense sur angular.mock.
        //
        // La directive focus a été enregistrée dans son propre module, 'focus.setFocusDirective'. On a uniquement
        // besoin de charger ce module et on évite de charger toute l'application au grand complet. On respecte
        // ainsi le principe d'isolation des tests unitaires.
        angular.mock.module('focus.setFocusDirective');
    });

    /**
     * La directive 'setFocus' sera enregistrée comme 'setFocusDirective' par AngularJS.
     * On peut donc l'injecter comme 'setFocusDirective'.
     * C'est toutefois un Array qui est retourné, puisqu'on peut enregistrer plusieurs
     * composantes avec le même nom.
     */
    it('assigne le focus si l’attribut est true', inject(function (setFocusDirective) {
        // on substitut le scope: un simple objet vide fait l'affaire.
        var scope = {};

        // on substitue un élément HTML (HTMLElement) par un objet JavaScript; on n'a qu'à substituer la méthode
        // focus(), c'est la seule utilisée par la directive.
        var substitutElement = {
            // on aurait pu créer le substitut comme ceci: 
            // var substitutElement = jasmine.createObj('element', ['focus'])
            // mais dans l'assertion plus bas, on n'aurait pas l'Intellisense sur substitutElement.focus
            focus: jasmine.createSpy('focus')
        };

        // l'argument element de la méthode link accepte un élément jqLite, qui consiste en un Array d'éléments
        var substitutElementJqLite = [substitutElement];

        // on substitue les attributs de l'élément HTML. par exemple pour:
        // <button setFocus="{{ ::vm.methodeRetournantBooleen() }}"
        // dont vm.methodeRetournantBooleen() retourne true, la valeur de setFocus sera la chaîne 'true'
        var attributs = {
            setFocus: 'true'
        };

        // il peut y avoir plusieurs directives avec le même nom. On prend la dernière enregistrée.
        var directive = setFocusDirective[setFocusDirective.length - 1];

        // directive représente la définition de la directive, et on peut obtenir sa fonction link:
        var link = directive.link;

        // on appelle link pour tester le comportement de la directive:
        link(scope, substitutElementJqLite, attributs);

        // nécessairement, pour mettre le focus sur un élément HTMLElement, on doit appeler sa méthode focus()
        expect(substitutElement.focus).toHaveBeenCalled();
    }));

    it('n’assigne pas le focus si l’attribut est false', inject(function (setFocusDirective) {
        var scope = {};
        var substitutElement = {
            focus: jasmine.createSpy('focus')
        };
        var substitutElementJqLite = [substitutElement];
        var attributs = {
            setFocus: 'false'
        };
        var directive = setFocusDirective[setFocusDirective.length - 1];

        directive.link(scope, substitutElementJqLite, attributs);

        expect(substitutElement.focus).not.toHaveBeenCalled();
    }));

    it('assigne le focus si aucune valeur n’est spécifiée', inject(function (setFocusDirective) {
        var scope = {};
        var substitutElement = {
            focus: jasmine.createSpy('focus')
        };
        var substitutElementJqLite = [substitutElement];
        var attributs = {
            setFocus: ''
        };
        var directive = setFocusDirective[setFocusDirective.length - 1];

        directive.link(scope, substitutElementJqLite, attributs);

        expect(substitutElement.focus).toHaveBeenCalled();
    }));
});