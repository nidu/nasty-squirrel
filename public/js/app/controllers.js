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

    .controller("EditArticleCtrl", function($scope, Article, Tag, Product, ProductVersion, Utils, article) {
      $scope.article = article;
      $scope.isNew = article.id != "";

      $scope.queryTags = function(query) {
        return Tag.query({query: query, exclude: Utils.excludeToStr($scope.article.tags)}).$promise
      };

      $scope.addTag = function(tag) {
        if (tag) {
          var tags = $scope.article.tags;
          var i = 0;
          while (i < tags.length && tags[i].title != tag.title) { i++; }

          if (i == tags.length)
            $scope.article.tags.push(tag);
        }
        $scope.temp.tag = "";
      };

      $scope.removeTag = function(tag) {
        var index = $scope.article.tags.indexOf(tag);
        if (index != -1) {
          $scope.article.tags.splice(index, 1);
        }
      };

      $scope.tagKeyPressed = function(e) {
        var code = e.keyCode || e.which;
        if (code == 13 && e.target.value) {
          e.preventDefault();
          $scope.addTag({title: e.target.value});
        }
      };

      $scope.queryProducts = function(query) {
        return Product.query({query: query}).$promise
      };

      $scope.productSelected = function(product) {
        if (product) {
          $scope.temp.productVersions = ProductVersion.query({product_id: product.id}, function() {
            $scope.temp.articleProduct.productVersion = $scope.temp.productVersions[0];
          });
        }
      };

      $scope.addArticleProduct = function(articleProduct) {
        if (articleProduct.product && articleProduct.productVersion) {
          console.log(articleProduct);
          $scope.article.articleProducts.push(articleProduct);

          $scope.temp.articleProduct = {
            product: null,
            productVersion: null,
            appliesTo: ""
          };
          $scope.temp.productVersions = null;
        }
      };

      $scope.removeArticleProduct = function(articleProduct) {
        var index = $scope.article.articleProducts.indexOf(articleProduct);
        if (index != -1) {
          $scope.article.articleProducts.splice(index, 1);
        }
      };

      $scope.productKeyPressed = function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
          e.preventDefault();
        }
      };

      $scope.addAttachment = function(attachment) {
        if (attachment) {
          if (!attachment.title) attachment.title = attachment.fileName;
          $scope.article.attachments.push(attachment);
          $scope.temp.attachment = null;
        }
      };

      $scope.removeAttachment = function(attachment) {
        var index = $scope.article.attachments.indexOf(attachment);
        if (index != -1) {
          $scope.article.attachments.splice(index, 1);
        }        
      };

      $scope.saveArticle = function(article) {
        article.$save();
      };
    })
})