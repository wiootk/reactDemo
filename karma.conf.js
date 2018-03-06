var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        //   browsers: [ 'Chrome' ] npm install karma-chrome-launcher --save-dev
        singleRun: true,
        frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
        files: [
            'test.webpack.js'
        ],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-mocha-reporter',
            'karma-sinon',
            'karma-sinon-chai',
            'karma-coverage'
        ],
        preprocessors: {
            'test.webpack.js': ['webpack', 'sourcemap', 'coverage']
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        reporters: ['progress', 'coverage'],
        // reporters: [ 'mocha' ],
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },
        autoWatch: true,
        singleRun: false
    });
};