app.factory("AuthService", function($http, $q, $window) {
  var userInfo;

  function getUserInfo() {
    return userInfo;
  }

  function login(userName, password) {
    var deferred = $q.defer();

    $http.post("./php/login.php", {
      userName: userName,
      password: password
    }).then(function(result) {
      
      userInfo = {
        accessToken: result.access_token,
        userName: result.userName,
        password: result.password
      };
      console.log(result);
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      deferred.resolve(userInfo);
    },function(error) {
      console.log("Error is printing");
      console.log(error);
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    login: login
  };
});