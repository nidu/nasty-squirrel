define(["angular"], function(angular) {

  return angular.module("app.services", [])
    
    .factory("Tag", function($resource, $http) {
      var Resource = $resource('tags/:id', {id: "@id"}, {
        merge: {method: "POST", url: "tags/merge"}
      });

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

      Resource.merge = function(from, into) {
        $http.post("tags/merge", {params: {from: from.id, into: into.id}}).then()
      };

      return Resource;
    })

})