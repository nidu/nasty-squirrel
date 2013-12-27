define(["angular"], function(angular) {

  return angular.module("app.services", [])
    .factory("Tag", function($resource) {
        return $resource('tags/:tagId', {tagId: "@id", q: ""});
      }
    )

})
