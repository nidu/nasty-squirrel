define(["angular"], function(angular) {
	return angular.module("app.directives", [])

		// inspired by http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file?answertab=votes#tab-top
		.directive("fileread", [function () {
	    return {
        scope: {
          fileread: "="
        },
        link: function (scope, element, attributes) {
          element.bind("change", function (changeEvent) {
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
              scope.$apply(function () {
                scope.fileread.file = loadEvent.target.result;
              });
            }
            if (!scope.fileread) scope.fileread = {};
            scope.fileread.fileName = changeEvent.target.files[0].name;
            reader.readAsDataURL(changeEvent.target.files[0]);
          });
        }
	    }
		}]);		
})