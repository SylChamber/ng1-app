describe('démo de tests', function () {
    
    describe('faux positifs', function () {
        
        it('un test sans assertion passe toujours', function () {
            // eslint-disable-next-line no-unused-vars
            var commentaire = 'Un test sans assertion passe toujours. Ça résulte en un faux sentiment de sécurité.';
        });

        it('une assertion dans une opération asynchrone sera toujours ignorée', function () {
            setTimeout(function () {
                // le test terminera avant que l'assertion soit évaluée.
                // Karma affichera l'erreur d'assertion dans la sortie, mais le test sera marqué comme réussi,
                // puisqu'un test sans assertion passe toujours.
                expect(true).toBe(false);
            }, 1);
        });
    });

    describe('tests asynchrones', function () {
        it('un test asynchrone nécessite d’indiquer à Jasmine que le test est asynchrone', function (done) {
            // ici, on indique à Jasmine qu'il s'agit d'un test asynchrone à l'aide du paramètre 'done'
            // qui représente une fonction de rappel (callback) qu'on appelle pour indiquer que le test est terminé.
            setTimeout(function () {
                // ici, l'assertion sera bel et bien évaluée grâce à l'appel à 'done'. Le test échouera donc.
                expect(true).toBe(false);
                done();
            }, 1);
        });
    });
});