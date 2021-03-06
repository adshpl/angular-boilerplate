const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine',
      '@angular-devkit/build-angular',
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: path.join(__dirname, './coverage'),
      subdir: '.',
      reporters: [{
        type: 'html',
      }, {
        type: 'text-summary',
      }],
    },
    reporters: [
      'progress',
      'kjhtml',
    ],
    browsers: ['Chrome'],
    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true
  });
};
