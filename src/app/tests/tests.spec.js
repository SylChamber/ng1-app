describe('démo de tests', function () {

    describe('faux positifs', function () {

        it('un test sans assertion passe toujours', function () {
            // eslint-disable-next-line no-unused-vars
            var commentaire = 'Un test sans assertion passe toujours. Ça résulte en un faux sentiment de sécurité.';
        });

        it('une assertion dans une opération asynchrone pourrait être ignorée', function () {
            setTimeout(function () {
                // le test terminera avant que l'assertion soit évaluée.
                // Karma affichera l'erreur d'assertion dans la sortie, mais le test sera marqué comme réussi,
                // puisqu'un test sans assertion passe toujours.
                fail('ce test devrait échouer, mais peut aussi bien passer!');
            }, 1);
        });

        it('une assertion sur une fonction retournant une promesse peut également être ignorée', function () {
            operationRetournantPromesseDeValeurTrue()
                .then(function () {
                    fail('ce test devrait échouer, mais peut aussi bien passer!');
                });
        });
    });

    function operationRetournantPromesseDeValeurTrue() {
        // Promise a été introduit dans ECMAScript 2015 mais peut être utilisé dans IE11
        // à l'aide du polyfill ES6-Promise https://github.com/stefanpenner/es6-promise
        // sous AngularJS, l'équivalent est: return $q(function (resolve) { ... })
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(true);
            }, 1);
        });
    }

    describe('tests asynchrones', function () {
        it('un test sur une fonction asynchrone nécessite d’indiquer à Jasmine que l’opération est terminée',
            function (done) {
                // ici, on indique à Jasmine qu'il s'agit d'un test asynchrone à l'aide du paramètre 'done'
                // qui représente une fonction de rappel (callback) qu'on appelle pour indiquer que le test est terminé.
                setTimeout(function () {
                    // ici, l'assertion sera bel et bien évaluée grâce à l'appel à 'done'. Le test échouera donc.
                    fail('Ce test échouera à tout coup!');
                    done();
                }, 1);
            });

        it('un test sur une fonction retournant une promesse nécessite aussi l’utilisation de done', function (done) {
            operationRetournantPromesseDeValeurTrue()
                .then(function () {
                    fail('Ce test échouera à tout coup!');
                    done();
                });
        });
    });
});