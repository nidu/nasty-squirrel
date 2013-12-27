define(['angular', 'app/app'], function(angular, app) {

	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state("search", {
				url: "/",
				templateUrl: "partials/search.html",
	      controller: "SearchCtrl"
			})
			.state("newArticle", {
				url: "/articles/new",
				templateUrl: "partials/articles/new.html",
	      controller: "NewArticleCtrl"
			})
	})
	
})