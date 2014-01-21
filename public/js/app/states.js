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
			.state("newArticle", {
				url: "/articles/new",
				templateUrl: "partials/articles/new.html",
	      controller: "NewArticleCtrl"
			})
			.state("tags", {
				url: "/tags",
				templateUrl: "partials/tags/index.html",
				controller: "TagsCtrl",
				resolve: {
					tags: function(Tag) {
						return Tag.query();
					}
				}
			})
	})
	
})