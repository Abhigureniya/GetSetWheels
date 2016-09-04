var app = angular.module('GetSetWheels',(['ui.router']));
/*
app.config(function($authProvider) {

    $authProvider.facebook({
      clientId: 'Facebook App ID'
    });

    // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
    $authProvider.facebook({
      clientId: '1768761420037591',
      responseType: 'token',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
  redirectUri: window.location.origin + '/',
  requiredUrlParams: ['display', 'scope'],
  scope: ['email'],
  scopeDelimiter: ',',
  display: 'popup',
  oauthType: '2.0',
  popupOptions: { width: 580, height: 400 }
    });

    $authProvider.google({
      clientId: '853631268682-6ge54u7op5g74u1rh6d6mgg7mu99lcif.apps.googleusercontent.com'
    });


  });*/


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