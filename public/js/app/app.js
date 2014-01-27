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
      'app.controllers',
      'app.directives',
      'app.services',
      'app.filters'
    ]);
  }
);