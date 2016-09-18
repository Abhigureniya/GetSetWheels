app
.factory('AuthService', function ($http,$cookies,$state) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('./php/login.php', credentials)
      .then(function (res) {
        console.log(res.data);
        /*Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);*/
        $cookies.putObject("userInfo",res.data.user);
        $('#login_modal').modal('hide');
        //$state.go('fbdialog');
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {

    if($cookies.get("userInfo")){
      console.log($cookies.getObject('userInfo'));
      console.log("Returning true");
      return true;
    }else{
      return false;
    }

  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    console.log("Getting user from cookies");
    console.log();
    var user = $cookies.getObject('userInfo');
    console.log(user);
    //console.log("Role:- " + user.userRole + " AuthorizedRole:- " + authorizedRoles);
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(user.userRole) !== -1);
  };
 
  return authService;
})
/*.service('Session', function ($cookies) {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
})*/
.factory('AuthInterceptor', function ($rootScope, $q,
                                      AUTH_EVENTS) {
  return {

    request: function(config){
      console.log("Request interceptor:- " + config);
      return $q.resolve(config);
    },

    responseError: function (response) { 
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
.factory('AuthResolver', function ($q, $rootScope, $state) {
  return {
    resolve: function () {
      var deferred = $q.defer();
      var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            deferred.resolve(currentUser);
          } else {
            deferred.reject();
            $state.go('login');
          }
          unwatch();
        }
      });
      return deferred.promise;
    }
  };
});