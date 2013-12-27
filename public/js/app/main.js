require.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: "js/lib",
  paths: {
    "app": "../app"
  },
  shim: {
    "angular": {"exports" : "angular"},
    "angular-ui-router": ["angular"],
    "angular-resource": ["angular"],
    "angular-ui-bootstrap-0.7.0": ["angular"],
    "angular-ui-bootstrap-tpls-0.7.0": ["angular"],
    "angular-ui-utils": ["angular"],
    "angular-loader": ["angular"],
    "angular-mocks": {
      deps: ["angular"],
      "exports": "angular.mock"
    }
  },
  priority: [
    "angular"
  ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require([
  // "jquery",
  "angular",
  "app/app",
  // "angular-animate",
  // "angular-cookies",
  "angular-loader",
  "angular-mocks",
  "angular-resource",
  // "angular-route",
  // "angular-sanitize",
  // "angular-scenario",
  // "angular-touch",
  "angular-ui-bootstrap-0.7.0",
  "angular-ui-bootstrap-tpls-0.7.0",
  "angular-ui-router",
  "angular-ui-utils",
  "app/states"
], function(angular, app) {
  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    angular.resumeBootstrap([app['name']]);
  });
});