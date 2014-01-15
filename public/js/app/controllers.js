define(['angular'], function(angular) {

  return angular.module('app.controllers', [])

    .controller("SearchCtrl", function($scope, Tag) {
      $scope.data = {
        query: "",
        tagQuery: "",
        tags: []
      };

      $scope.queryTags = function(query) {
        return Tag.queryForTypeahead(query, $scope.data.tags);
      };

      $scope.tagSelected = function(model) {
        $scope.data.tags.push(model);
        $scope.data.tagQuery = "";
      }

      $scope.removeTag = function(tag) {
        var tags = $scope.data.tags;
        var index = tags.indexOf(tag);
        if (index > -1) {
          $scope.data.tags.splice(index, 1);
        }
      }
    })

    .controller("SearchResultCtrl", function($scope) {
      $scope.search = function() {};
    })

    .controller("NewArticleCtrl", function($http, $scope, limitToFilter) {
      $scope.article = {tags: []};

      $scope.addTag = function() {
        $scope.article.tags.push($scope.article.tag);
        $scope.article.tag = "";
      };

      $scope.availableTags = function(q) {
        var exclude = $scope.article.tags.map(function(t) {
          return t.id
        }).join(",");

        var params = {
          q: q,
          exclude: exclude
        };

        return $http.get('/tags', {params: params}).then(function(response){
          return limitToFilter(response.data, 15);
        });
      };

      $scope.onTagSelect = function(model) {
        $scope.article.tags.push(model);
        $scope.article.tag = "";
      };
    })

})