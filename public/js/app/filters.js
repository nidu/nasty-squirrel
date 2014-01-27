define(['angular'], function(angular) {
	return angular.module("app.filters", [])
		.filter("replaceNull", function() {
			return function(input, replaceWith) {
				return input ? input : replaceWith;
			};
		})

		.filter("articleProduct", function() {
			return function(articleProduct) {
				if (articleProduct.productVersion.version) {
					var v = "";
					switch (articleProduct.appliesTo) {
						case "above": v = ">"; break;
						case "below": v = "<"; break;
					}
					
					return articleProduct.product.title + " " + v + articleProduct.productVersion.version;
				} else {
					return articleProduct.product.title;
				}
			};
		})
})