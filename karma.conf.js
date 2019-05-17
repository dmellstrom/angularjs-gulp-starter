module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-*/angular-*.js',
      '**/*.module.js',
      '**/*.component.js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]

  });
};
