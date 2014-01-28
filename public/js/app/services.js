define(["angular"], function(angular) {

  return angular.module("app.services", [])

    .factory("Article", function($resource, $http, Utils) {
      var Resource = $resource('articles/:id', {}, {
        save: {method: "POST", transformRequest: function(data, headersGetter) {
          var article = {
            title: data.title,
            content: data.content,
            tagIds: data.tags.filter(function(t) { return t.id }).map(function(t) { return t.id }),
            tags: data.tags.filter(function(t) { return !t.id }),
            productVersionRanges: data.productVersionRanges.map(function(range) {
              return {startProductVersionId: range.startProductVersion.id, endProductVersionId: range.endProductVersion.id}
            }),
            relatedArticleIds: data.relatedArticles.map(function(a) { return a.id })
          };

          return angular.toJson(article);
        }}
      });

      return Resource;
    })
    
    .factory("Tag", function($resource, $http, Utils) {
      return $resource('tags/:id', {id: "@id"});
    })

    .factory("Product", function($resource, $http, Utils) {
      return $resource("products/:id", {id: "@id"});
    })

    .factory("ProductVersion", function($resource, $http, Utils) {
      return $resource("product-versions/:id", {id: "@id"});
    })

    .factory("Utils", function($http) {
      return {
        excludeToStr: function(exclude, field) {
          if (!field) field = "id";

          return exclude.map(function(e) {
            return e[field]
          }).join(",");
        }
      }
    })
})