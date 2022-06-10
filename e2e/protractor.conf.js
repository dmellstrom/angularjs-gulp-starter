exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    '**/*.js'
  ],

  exclude: [
    'start.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8888/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
