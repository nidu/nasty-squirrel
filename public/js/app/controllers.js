define(['angular'], function(angular) {

  return angular.module('app.controllers', [])

    .controller("SearchCtrl", function($scope) {
      $scope.data = {query: "Hello"}
    })

    .controller("NewArticleCtrl", function($http, $scope, limitToFilter) {
      $scope.article = {tags: []};

      $scope.addTag = function() {
        $scope.article.tags.push($scope.article.tag);
        $scope.article.tag = "";
      };

      $scope.availableTags = function(q) {
        return $http.get('/tags', {params: {q: q}}).then(function(response){
          return limitToFilter(response.data, 15);
        });
      };
    })

})