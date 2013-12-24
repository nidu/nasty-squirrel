module.exports = function(config){
  config.set({
    basePath : '../',

    files : [
      'public/js/lib/angular/angular.js',
      'public/js/lib/angular/angular-*.js',
      'public/js/app/app.js',
      'public/js/app/!(app).js',
      'test/**/*.js'
    ],

    exclude : [
      'public/js/lib/angular/angular-loader.js',
      'public/js/lib/angular/*.min.js',
      'public/js/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
