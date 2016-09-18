var app = angular.module('GetSetWheels',(['ui.router','angular-google-gapi','ngCookies']));



window.fbAsyncInit = function() {
  FB.init({
    appId      : '1768761420037591',
    xfbml      : true,
    version    : 'v2.7'
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};
(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log("We are connected");
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log("We are not connected.");
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log("We are not logged in.");
    }
  }

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  }




//Authentication Module integration start

app.run(function ($rootScope, AUTH_EVENTS, AuthService,$state) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    //console.log(event);
    //console.log(next);
    if(next.url != '/default'){
      console.log("event $stateChangeStart " + next.data.authorizedRoles);
    var authorizedRoles = next.data.authorizedRoles;
    if (!AuthService.isAuthorized(authorizedRoles)) {
      console.log('Checking authorization');
      event.preventDefault();
      if (AuthService.isAuthenticated()) {
        console.log('Checking Authentication');
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        $state.go('error');
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        $state.go('login');
        $('#login_modal').modal('hide');
      }
    }

}
  });
});


//constants
app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
}).constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});
/*app.directive('loginDialog', function (AUTH_EVENTS) {
  return {
    restrict: 'A',
    template: '<div ng-if="visible" ng-include="\'login-form.html\'">',
    link: function (scope) {
      var showDialog = function () {
        scope.visible = true;
      };
  
      scope.visible = false;
      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
    }
  };
});*/


//Authentication Module integration end
  






//Carousel begins here
jQuery(document).ready(function() {
  jQuery('.carousel[data-type="multi"] .item').each(function(){
    var next = jQuery(this).next();
    if (!next.length) {
      next = jQuery(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo(jQuery(this));
    for (var i=0;i<2;i++) {
      next=next.next();
      if (!next.length) {
        next = jQuery(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
    }
  });
});
//Carousel ends here
