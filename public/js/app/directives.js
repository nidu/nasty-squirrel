define(["angular"], function(angular) {
	return angular.module("app.directives", [])
		.directive("nsqTagSearch", function() {
			return {
				scope: {
					ngModel: "=",
					inputId: "@",
					inputDivClass: "@",
					listDivClass: "@",
					onlyExisting: "@"
				},
				templateUrl: "partials/directives/tag-search.html",
				controller: "TagSearchCtrl"
			}
		})
})