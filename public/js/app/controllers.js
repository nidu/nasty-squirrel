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
        if (model) {
          $scope.tagSearch.tags.push(model);
          updateParent();
        }
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

      $scope.keyPressed = function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
          e.preventDefault();

          if ($scope["onlyExisting"] == undefined) {
            if (e.target.value) {
              $scope.tagSelected({title: e.target.value});
            }
          }
        }
      };
    })

    .controller("TagsCtrl", function($scope, $modal, Tag, tags) {
      $scope.tags = tags;

      $scope.open = function(mergeFromTag) {
        $modal.open({
          templateUrl: "partials/tags/select-dialog.html",
          controller: "SelectTagDialogCtrl",
          resolve: {
            excludeTags: function() {
              return [mergeFromTag];
            },
            header: function() {
              return "Merge into " + mergeFromTag.title + "...";
            }
          }
        }).result.then(function(selectedTag) {
          console.log("Merge", mergeFromTag, selectedTag);
          Tag.merge({from: mergeFromTag.id, into: selectedTag.id});
          Tag.query({query: "ARARA"});
        });
      };

      $scope.deleteTag = function(tag) {
        Tag.remove({tagId: tag.id}, function() {
          var index = tags.inexOf(tag);
          if (index > -1) {
            $scope.tags.splice(index, 1);
          }
        });
      };
    })

    .controller("SelectTagDialogCtrl", function($scope, $modalInstance, Tag, excludeTags, header) {
      $scope.select = {
        excludeTags: excludeTags,
        header: header
      }

      $scope.queryTags = function(query) {
        return Tag.queryAsPromise(query, $scope.select.excludeTags);
      };

      $scope.tagSelected = function(model) {
        $scope.ok();
      };

      $scope.ok = function() {
        $modalInstance.close($scope.select.tag);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss("cancel");
      };
    })
})