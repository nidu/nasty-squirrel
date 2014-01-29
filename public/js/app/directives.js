define(["angular", "dropzone-amd-module"], function(angular, Dropzone) {
	return angular.module("app.directives", [])

    .directive("fileDropArea", function() {
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
              this.on("success", function(file, responseStr) {
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
            }
          });
        }
      }
    })
})