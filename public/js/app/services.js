define(["angular"], function(angular) {

  return angular.module("app.services", [])

    .factory("Article", function($resource, $http, Utils) {
      var Resource = $resource('articles/:id', {id: "@id"}, {
        save: {method: "POST", transformRequest: function(data, headersGetter) {
          var article = angular.copy(data);

          article.tags.forEach(function(tag) {
            if (tag.id)
              delete tag.title;
          });

          article.articleProducts = article.articleProducts.map(function(p) {
            return {id: p.productVersion.id, appliesTo: p.appliesTo};
          });

          article.relatedArticles = article.relatedArticles.map(function(a) {
            return {id: a.id};
          });

          console.log("Transform request", data, article);

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