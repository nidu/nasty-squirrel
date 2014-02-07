define(["angular", "dropzone-amd-module"], function(angular, Dropzone) {
	return angular.module("app.directives", [])

    .directive("fileDropArea", function($rootScope) {
      return {
        scope: {
          fileDropArea: "=",
          fileUploadProgress: "="
        },
        link: function(scope, element, attrs) {
          var dropzone = new Dropzone(element[0], {
            scope: "EA",
            url: "/attachments",
            init: function() {
              // after upload add file to ng-model (asuming it's array)
              this.addClass('dropzone');
              this.addClass('dz-clickable');
              this.on("success", function(file, responseStr) {
                console.log(file);
                response = angular.fromJson(responseStr);
                scope.$apply(function() {
                  scope.fileDropArea.push({
                    id: response.id,
                    fileName: file.name,
                    size: file.size,
                    mimeType: file.type,
                    isNew: true
                  });
                  scope.fileUploadProgress = 100;
                });
              });
              
              this.on("uploadprogress", function(file, progress) {
                scope.$apply(function() {
                  scope.fileUploadProgress = progress;
                });
              });

              // TODO: delete unsaved files on page close
              // $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

              // })
            }
          });
        }
      };
    });
});