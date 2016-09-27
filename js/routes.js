app.config(function($stateProvider,$urlRouterProvider,USER_ROLES){
	$urlRouterProvider
	.otherwise('default');
	$stateProvider
	.state("signup",{
		url: "/signup",
		templateUrl: "templates/signup.html",
		controller: 'ApplicationController',
		data: {
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor,USER_ROLES.all]
		}
	})
	.state("fbdialog",{
		url: "/fbdialog",
		templateUrl: "templates/fbdetails.html",
		controller: 'homeController',
		data: {
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		}
	})
	.state("error",{
		url: "/error",
		templateUrl: "templates/error.html",
		data: {
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor,USER_ROLES.all]
		}
	})
	.state("default",{
		url: "/default",
		templateUrl: "templates/search.html",
		controller: 'queryController',
	})
	.state("login",{
		url: "/default",
		templateUrl: "templates/search.html",
		controller: 'loginController',
	})
	.state("items",{
		url: "/items",
		templateUrl: "templates/items.html",
		controller: 'itemsController',	
		data: {
			authorizedRoles: [USER_ROLES.editor,USER_ROLES.admin]
		}
	})
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: 'dashboard/index.html',
		data: {
			authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		}
	}).state('protected-route', {
		url: '/protected',
		resolve: {
			auth: function resolveAuthentication(AuthResolver) { 
				return AuthResolver.resolve();
			}
		}
	});
}).config(function ($httpProvider) {
	$httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
			return $injector.get('AuthInterceptor');
		}
		]);
});