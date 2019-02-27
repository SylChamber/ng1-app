var globby = require('globby');
var path = require('path');

requireSansCache('angular/angular');
requireSansCache('angular-mocks');

globby([
    'src/app/**/*.module.js',
    'src/app/**/*.config.js',
    'src/app/**/*.routes.js',
    'src/app/**/*.service.js',
    'src/app/**/*.filter.js',
    'src/app/**/*.directive.js',
    'src/app/**/*.component.js'
])
    .then(function (module) {
        require(path.resolve(module));
    });

/**
 * Obtient un module npm ou local en vidant le cache npm au préalable.
 * @param {string} module Module à obtenir.
 */
function requireSansCache(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}
