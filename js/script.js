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
	});

}).controller('signupController',function($scope){
	$scope.user = "Abhijeet";
	
}).controller("queryController",function($scope){
	
})
.controller("homeController",function($scope,$state){
	$scope.user = "Abhijeet Singh Gureniya";
	$scope.FBLogin = function(){
		FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     console.log(response);
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
     $('#login_modal').modal('hide');
     $state.go('fbdialog');
    } else {
     console.log('User cancelled login or did not fully authorize.');
     $('#login_modal').modal('hide');
     $state.go('error');
    }
});
};
})
;

