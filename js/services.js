app.factory("AuthService", function($http, $q, $window) {
  var userInfo;

  function getUserInfo() {
    return userInfo;
  }

  function login(userName, password) {

    console.log(userName);
    console.log(password);

    $http.post("./php/login.php",{
      userName: userName,
      password: password
    }).then(function(result) {
      
      userInfo={};
      /*userInfo = {
        accessToken: result.access_token,
        userName: result.userName,
        password: result.password
      };*/
      console.log("Printing response");
      console.log(result);
      //$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      //deferred.resolve(userInfo);
    });/*.function(error) {
      console.log("Error is printing");
      console.log(error);
      deferred.reject(error);
    });*/
  }

  return {
    login: login
  };
});