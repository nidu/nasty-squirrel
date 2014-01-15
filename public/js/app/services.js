define(["angular"], function(angular) {

  return angular.module("app.services", [])
    
    .factory("Tag", function($resource, Utils) {
        var Resource = $resource('tags/:tagId', {tagId: "@id", query: ""});

        Resource.queryForTypeahead = function(query, excludeTags, limit) {
          var params = {query: query};

          if (excludeTags.length > 0) {
            var excludeStr = excludeTags
              .map(function(t) { return t.id })
              .join(",");
            params.exclude = excludeStr;
          }

          console.log(params);

          return Utils.queryForTypeahead("/tags", params, limit || 10);
        };

        return Resource;
      }
    )

    .factory("Utils", function($http, limitToFilter) {
      return {
        queryForTypeahead: function(url, params, limit) {
          return $http.get(url, {params: params}).then(function(response) {
            return limitToFilter(response.data, limit);
          });
        }
      }
    })

})
