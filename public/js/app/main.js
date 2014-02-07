require.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: "js/lib",
  paths: {
    "app": "../app"
  },
  shim: {
    "angular": {
      "exports" : "angular"
    },
    "angular-ui-router": ["angular"],
    "angular-resource": ["angular"],
    "angular-sanitize": ["angular"],
    "ui-bootstrap-0.10.0": ["angular"],
    "ui-bootstrap-tpls-0.10.0": ["angular"],
    "angular-ui-tinymce": ["angular", "tinymce.min"],
    "tinymce.min": {
      exports: "tinyMCE",
      init: function() {
        this.tinyMCE.DOM.events.domLoaded = true;
        return this.tinyMCE;
      }
    },
    // "angular-ui-utils": ["angular"],
    // "angular-loader": ["angular"],
    // "angular-scenario": ["angular"],
    // "angular-route": ["angular"],
    // "angular-mocks": ["angular"],
    // "angular-cookies": ["angular"],
    // "angular-animate": ["angular"],
    "angular-mocks": {
      "deps": ["angular"],
      "exports": "angular.mock"
    }
  },
  priority: [
    "angular"
  ]
});

// http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require([
  // "jquery",
  "angular",
  "app/app",
  "angular-ui-router",
  "angular-resource",
  "ui-bootstrap-0.10.0",
  "ui-bootstrap-tpls-0.10.0",
  "angular-mocks",
  "dropzone-amd-module",
  "tinymce.min",
  "angular-ui-tinymce",
  "angular-sanitize",
  // "angular-animate",
  // "angular-cookies",
  // "angular-loader",
  // "angular-route",
  // "angular-scenario",
  // "angular-touch",
  // "angular-ui-utils",
  "app/states"
], function(angular, app) {
  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    angular.resumeBootstrap([app.name]);
  });
});