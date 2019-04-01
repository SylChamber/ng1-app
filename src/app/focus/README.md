# Exemple de directive manipulant le DOM - mise du focus sur un élément

Ceci est un exemple de directive qui manipule le DOM et les tests unitaires correspondants.

Le besoin est de mettre le focus sur un élément (ici, un champ de saisie) selon une condition, sinon de mettre le focus sur un autre élément.

L'exemple sert à démontrer:

* comment écrire une directive simple qui manipule le DOM;
* comment écrire des tests unitaires de la logique d'une directive sans avoir à la compiler avec `$compile`;
* l'utilisation du one-time binding « `::` » pour les situations où nous n'avons pas besoin qu'une valeur liée
  soit surveillée après le premier chargement de la page;
* l'utilisation des fichiers de déclaration de types TypeScript (*TypeScript Declaration Files*) `*.d.ts`
  et des commentaires JSDoc pour avoir les suggestions et l'autocomplétion (Intellisense) sur les objets
  JavaScript et Angular.

Pour référence, consulter la documentation d'AngularJS:

* [Creating Custom Directives](https://docs.angularjs.org/guide/directive)
* [Unit Testing ― Testing Directives](https://docs.angularjs.org/guide/unit-testing#testing-directives)

## Visionner les pages web de démonstration

Les exemples sont dans les pages:

* exemple-recherche-renseignée.html
* exemple-recherche-vide.html

On peut les exécuter en installant l'extension VSCode `Live Server` puis en sélectionnant **Open with Live Server**
à partir du menu contextuel de chaque fichier dans l'explorateur.

## Structure

L'exemple est constitué de:

* les pages HTML spécifiées ci-dessus;
* la directive `setFocus` définie dans `set-focus.directive.js`;
* les tests de la directive dans `set-focus.directive.spec.js`;
* le component `formulaire` défini dans `formulaire.component.js`, qui permet de démontrer l'utilisation de la directive;
* le template du component, `formulaire.html`;
* le module `focus` défini dans `focus.module.js`, qui regroupe la fonctionnalité de l'exemple.

## Tests unitaires

La technique habituelle de test d'une directive implique de la compiler avec le service `$compile` pour en vérifier
le rendu HTML. Dans cet exemple, nous n'avons pas utilisé cette technique. Lorsqu'on désire uniquement tester la logique d'une
directive, on peut l'injecter directement dans notre test, et c'est ce qui a été fait ici.

### Injection de l'objet de définition de directive (DDO)

Lorsqu'on enregistre une directive dans Angular, par exemple `setFocus`, Angular enregistre l'[objet de définition
de directive](https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object) avec un nom qui commence
par le nom de la directive et qui finit par `Directive`: `setFocusDirective`. On peut utiliser le mécanisme d'injection
dans les tests pour l'obtenir:

```JavaScript
    it('assigne le focus si l’attribut est true', inject(function (setFocusDirective) {
        //...
    }));
```

La variable retournée est un `Array` qui contient tous les objets de définition de directive enregistrés avec
le même nom. Pour tester la fonction `link` de notre directive, il suffit de récupérer le premier élément du `Array`
et de tester sa fonction `link`:

```JavaScript
    var link = setFocusDirective[0].link;

    link(substitutScope, substitutElement, substitutAttributs);
```

### Substitution des dépendances de la directive

La méthode `link` nécessite qu'on lui fournisse le `scope` de l'élément HTML sur laquelle elle s'applique, l'élément
HTML en question enveloppé dans un objet `jqLite` et un objet représentant les attributs de l'élément. Ces composantes
peuvent être substituées dans les tests.

#### Substitution du `scope`

Le `scope` peut être substitué par un simple objet vide dans notre exemple, car la directive n'en a pas besoin:

```JavaScript
var scope = {};
```

#### Substitution de l'élément

Un substitut d'élément HTML ne peut être créé par [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
car ce n'est pas une [fonction de construction](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/L_op%C3%A9rateur_new),
mais une interface.

Toutefois, comme avec tout substitut en tests unitaires, on a uniquement besoin de fournir un objet qui présente
l'interface requise par la directive. La seule chose dont notre directive `setFocus` a besoin, c'est d'un objet qui
détient une fonction `focus()`.

Le substitut d'élément nous servira à vérifier le bon comportement de la directive, alors on peut faire de la fonction
`focus()` un espion:

```JavaScript
var element = {
    focus: jasmine.createSpy('focus')
};
```

L'argument `element` de la fonction `link` doit être un élément HTML enveloppé dans un objet `jqLite`. Il consiste
seulement en un `Array` qui expose des méthodes `jqLite`. Notre directive n'en a pas besoin, alors on peut simplement
utiliser un `Array`:

```JavaScript
var elementJqLite = [element];
```

Pour vérifier si notre directive fait vraiment le focus sur l'élément désiré, il suffit de vérifier si l'espion `focus`
a été appelé.

#### Substitution des attributs

On suit le même principe ici que pour la substitution de l'élément: on utilise un objet qui expose l'interface dont
la directive a besoin. La valeur assignée à la directive sera exposée dans l'objet d'attributs comme propriété
`setFocus`. Pour une valeur correspondant au résultat d'une fonction qui retourne un booléen, ce sera une chaîne:
`'true'` ou `'false'`:

```JavaScript
var attributs = {
    setFocus: 'true'
};
```

### Test

Pour tester une directive qui manipule le DOM, on substitue l'élément sur lequel elle doit agir par un espion (*spy*)
et on vérifie tout appel à l'espion.

Notre directive qui met le focus sur un élément devra appeler sa méthode [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus). Notre substitut d'élément expose donc une fonction espion `focus` (voir la section précédente). Le test vérifie donc
que `focus` a été appelée si la valeur fournie à la directive est `'true'`:

```JavaScript
var element = {
    focus: jasmine.createSpy('focus')
};
var elementJqLite = [element];

link(scope, elementJqLite, attributs);

expect(element.focus).toHaveBeenCalled();
```

Ici, on favorise la création d'un espion avec `jasmine.createSpy` plutôt qu'avec `jasmine.createSpyObj`:

```JavaScript
var element = jasmine.createSpyObj('focus', ['focus']);
```

Le résultat final serait le même, mais **la version `jasmine.createSpyObj` ne disposerait pas de l'Intellisense**:
la méthode `focus` ne serait pas affichée dans les choix pour la variable `element`.
