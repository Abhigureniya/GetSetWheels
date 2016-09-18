app
.controller('ApplicationController',function ($scope,USER_ROLES,AuthService,$state,$cookies,$rootScope) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
    console.log("User:- ");
    console.log(user);
  };

  $scope.logout = function(){
    var loggedOutBy = $rootScope.loggedInBy;
    if(loggedOutBy == "GSW"){

    }else if(loggedOutBy == "FB"){
        FB.logout();
    }else if(loggedOutBy == "GOOGLE"){
      gapi.auth2.getAuthInstance().signOut().then(function(){
        console.log("User Signed out");
      });
    }
    $cookies.remove('userInfo');
    $scope.currentUser = null;
    $state.go('default');

  };
})
.controller("queryController",function($scope){
	
})
.controller("itemsController",function($scope){
  
})
.controller("homeController",function ($scope,$state,GApi) {
  
})
.controller("loginController",function($scope, $rootScope, AUTH_EVENTS, AuthService,$state){
	$scope.user = "Abhijeet Singh Gureniya";
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $rootScope.loggedInBy = "GSW";
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
	$scope.FBLogin = function(){
		FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     console.log(response);
     var token = response.authResponse.token;
     FB.api('/me?locale=en_US&fields=name,email', function(response) {
       console.log('Good to see you, ' + response.name + '.');
       console.log(response);
       $rootScope.loggedInBy = "FB";
       var credentials = {
          "id": response.id,
          "token": token,
          "name": response.name,
          "loggingInBy": "FB"
       };
       AuthService.login(credentials).then(function (user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
          
          });
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

$scope.gLogin = function(){
  handleSigninClick();
};
//google
//var apiKey = 'AIzaSyCkmQI-2tp36ESLVMFOqcP5fca-f-D1D5I';
var clientId = '853631268682-6ge54u7op5g74u1rh6d6mgg7mu99lcif.apps.googleusercontent.com';
var clientSecret = 'uEUbhGHnQeR0rDHGz38WH0rQ';
var scopes = 'profile';

function initAuth() {
  //gapi.client.setApiKey(apiKey);
  gapi.auth2.init({
      client_id: clientId,
      client_secret: clientSecret,
      scope: scopes
  }).then(function () {
    console.log("Success");
    // Listen for sign-in state changes.
    //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  });
}

// Get authorization from the user to access profile info
function handleSigninClick() {
  gapi.auth2.getAuthInstance().signIn().then(function(resp) {
    console.log("Signing in....");
    makeApiCall();
    console.log("Signing in.... complete");
    $rootScope.loggedInBy = "GOOGLE";
  },function(error){
    console.log(error);
  });
}

gapi.load('client:auth2', initAuth);

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  console.log("Loading client data...");
  /*gapi.client.load('people', 'v1', function() {
    var request = gapi.client.people.people.get({
      resourceName: 'people/me'
    });
    request.execute(function(resp) {
      console.log(resp);
    });
  });*/
  gapi.client.load('plus','v1', function(){
 var request = gapi.client.plus.people.get({
   'userId': 'me'
 });
 console.log(request);
 request.execute(function(resp) {
   console.log('Retrieved profile for:' + resp.displayName);
   console.log('Response:');
   console.log(resp.emails[0].value);
    var credentials = {
          "id": resp.emails[0].value,
          "token": resp.id,
          "name": resp.displayName,
          "loggingInBy": "GOOGLE"
       };
       AuthService.login(credentials).then(function (user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
          });
 });
});
  console.log("Client data loaded....");
  // Note: In this example, we use the People API to get the current
  // user's name. In a real app, you would likely get basic profile info
  // from the GoogleUser object to avoid the extra network round trip.
  console.log(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getGivenName());
}
//google end


})
;

/*app.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$routeChangeSuccess", function(userInfo) {
    console.log(userInfo);
  });

  $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
    if (eventObj.authenticated === false) {
      $state.go("login");
    }
  });
}]);*/

