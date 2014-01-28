define(['angular', 'app/app'], function(angular, app) {

	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state("search", {
				url: "/",
				templateUrl: "partials/search.html",
	      controller: "SearchCtrl"
			})
			.state("search.results", {
				url: "/articles",
				templateUrl: "partials/search_result.html",
				controller: "SearchResultCtrl"
			})
			.state("articles", { template: "<div ui-view></div>" })
			.state("articles.new", {
				url: "/articles/new",
				templateUrl: "partials/articles/new.html",
	      controller: "EditArticleCtrl",
	      resolve: {
	      	article: function(Article) {
	      		var a = new Article();
	      		a.tags = [];
	      		a.productVersionRanges = [];
	      		a.attachments = [];
	      		a.relatedArticles = [];
	      		return a;
	      	}
	      }
			})
			.state("articles.edit", {
				url: "/articles/:id/edit",
				templateUrl: "partials/articles/new.html",
				controller: "EditArticleCtrl",
				resolve: {
					article: function($stateParams, Article) {
						return Article.get({id: $stateParams.id}).$promise;
					}
				}
			})
			.state("articles.show", {
				url: "/articles/:id",
				templateUrl: "partials/articles/show.html",
				controller: "ShowArticleCtrl",
				resolve: {
					article: function($stateParams, Article) {
						return Article.get({id: $stateParams.id}).$promise;
					}
				}
			})
	})
	
})