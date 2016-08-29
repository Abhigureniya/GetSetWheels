var app = angular.module('GetSetWheels',(['ui.router']))
.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider
                    .otherwise('/default');
	$stateProvider
	.state("signup",{
		url: "/signup",
		templateUrl: "templates/signup.html",
		controller: 'signupController'
	})
	.state("default",{
		url: "/default",
		templateUrl: "templates/search.html",
		controller: 'queryController'
	})

}).controller('signupController',function($scope){
	$scope.user = "Abhijeet";
})
.controller("queryController",function($scope){
	$scope.user = "Abhijeet Singh Gureniya";
});