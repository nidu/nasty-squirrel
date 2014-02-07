define([
  'angular',
  'app/controllers',
  'app/directives',
  'app/services',
  'app/filters'
  ], function(angular, controllers) {
    return angular.module('app', [
      "ui.router",
      "ngResource",
      "ui.bootstrap",
      "ui.tinymce",
      "ngSanitize",
      'app.controllers',
      'app.directives',
      'app.services',
      'app.filters'
    ]);
  }
);