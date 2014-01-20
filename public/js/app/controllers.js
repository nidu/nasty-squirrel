define(['angular'], function(angular) {

  return angular.module('app.controllers', [])

    .controller("SearchCtrl", function($scope, Tag) {
      $scope.data = {
        query: "",
        tags: []
      };
    })

    .controller("SearchResultCtrl", function($scope) {
      $scope.search = function() {};
    })

    .controller("NewArticleCtrl", function($scope, Tag) {
      $scope.article = {
        tags: []
      };
    })

    .controller("TagSearchCtrl", function($scope, Tag) {
      $scope.tagSearch = {
        query: "",
        tags: []
      }

      var updateParent = function() {
        $scope.ngModel = $scope.tagSearch.tags
      };

      $scope.queryTags = function(query) {
        return Tag.queryAsPromise(query, $scope.tagSearch.tags)
      };

      $scope.tagSelected = function(model) {
        $scope.tagSearch.tags.push(model);
        updateParent();
        $scope.tagSearch.query = "";
      };

      $scope.removeTag = function(tag) {
        var tags = $scope.tagSearch.tags;
        var index = tags.indexOf(tag);
        if (index > -1) {
          $scope.tagSearch.tags.splice(index, 1);
          updateParent();
        }
      };
    })
})