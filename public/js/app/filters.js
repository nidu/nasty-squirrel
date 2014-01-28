define(['angular'], function(angular) {
	return angular.module("app.filters", [])
		.filter("replaceNull", function() {
			return function(input, replaceWith) {
				return input ? input : replaceWith;
			};
		})

		.filter("productVersionRange", function() {
			return function(productVersionRange) {
				var version = "";
				if (productVersionRange.startProductVersion.version) {
					if (productVersionRange.endProductVersion.version) {
						version = productVersionRange.startProductVersion.version + " - " + productVersionRange.endProductVersion.version;
					} else {
						version = "> " + productVersionRange.startProductVersion.version;
					}
				} else {
					if (productVersionRange.endProductVersion.version) {
						version = "< " + productVersionRange.endProductVersion.version;
					} else {
						version = "";
					}
				};

				return (productVersionRange.product.title + " " + version).trim();
			};
		})
})