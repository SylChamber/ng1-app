module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'src/scripts/angular.js',
            'src/scripts/angular-sanitize.js',
            'src/scripts/angular-animate.js',
            'src/scripts/angular-resource.js',
            'src/scripts/angular-ui-router.js',
            'src/config/angular-mocks.js',
            'src/app/**/*.module.js',
            'src/app/**/*.config.js',
            'src/app/**/*.routes.js',
            'src/app/**/*.service.js',
            'src/app/**/*.directive.js',
            'src/app/**/*.filter.js',
            'src/app/**/*.component',
            'src/app/**/*.html',
            'src/app/**/*.spec.js'
        ],
        preprocessors: {
            // mise en cache des templates pour les tests
            'src/app/**/*.html': ['ng-html2js'],
            // couverture de code
            'src/app/**/!(*spec|*test).js': ['coverage']
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'app.templates'
        },
        autoWatch: true,
        browsers: ['ChromeHeadlessDebugging'],
        customLaunchers: {
            ChromeDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9333'],
                debug: true
            },
            ChromeHeadlessDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9333', '--headless'],
                debug: true
            }
        },
        reporters: ['mocha', 'coverage'],
        coverageReporter: {
            type: 'lcov'
        },
        mochaReporter: {
            output: 'autowatch'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: false,
        concurrency: Infinity
    });
};