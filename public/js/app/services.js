define(["angular"], function(angular) {

  return angular.module("app.services", [])
    
    .factory("Tag", function($resource, $http) {
      var Resource = $resource('tags/:tagId', {tagId: "@id", query: ""});

      Resource.queryAsPromise = function(query, exclude) {
        var params = {query: query};

        if (exclude.length > 0) {
          var excludeIds = exclude.map(function(t) {
            return t.id
          }).join(",");
          params.exclude = excludeIds;
        }

        return $http.get("tags", {params: params}).then(function(response) {
          return response.data;
        });
      };

      return Resource;
    })

})