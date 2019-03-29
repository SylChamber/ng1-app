/**
 * Teste la configuration des tests.
 */
describe('configuration des tests', function () {
    /**
     * Détermine qu'Angular et son API est disponible dans l'espace global.
     */
    it('l’API angular est disponible', function () {
        expect(angular).toBeDefined();
        expect(angular.module).toBeDefined();
        expect(typeof angular.module).toBe('function');
    });

    /**
     * Détermine qu'Angular Mocks et son API est disponible dans l'espace global
     */
    it('l’API Angular Mocks est disponible', function () {
        expect(angular.mock).toBeDefined();
        expectFonctionModulePresente();
        expectFonctionInjectPresente();

        function expectFonctionModulePresente() {
            expect(angular.mock.module).toBeDefined();
            expect(typeof angular.mock.module).toBe('function');
            expect(module).toBe(angular.mock.module);
        }

        function expectFonctionInjectPresente() {
            expect(angular.mock.inject).toBeDefined();
            expect(typeof angular.mock.inject).toBe('function');
            expect(inject).toBe(angular.mock.inject);
        }
    });
});