app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider
                    .otherwise('default');
	$stateProvider
	.state("signup",{
		url: "/signup",
		templateUrl: "templates/signup.html",
		controller: 'signupController'
	})
	.state("fbdialog",{
		url: "/fbdialog",
		templateUrl: "templates/fbdetails.html",
		controller: 'homeController'
	})
	.state("error",{
		url: "/error",
		templateUrl: "templates/error.html"
	})
	.state("default",{
		url: "/default",
		templateUrl: "templates/search.html",
		controller: 'queryController'
	})
	.state("login",{
		url: "/default",
		templateUrl: "templates/search.html",
		controller: 'loginController'
	})
	.state("items",{
		url: "/items",
		templateUrl: "templates/items.html",
		controller: 'itemsController'
	});

});