mortGageClub.service('SessionService', function($window, $rootScope) {
  _this = this;

  var reset = function() {
    _this.currentUser = null;
  }

  var setAuthorization = function(data) {
    _this.currentUser = data;
  }

  reset();

  if($window.localStorage.currentUser != null) {
    setAuthorization(JSON.parse($window.localStorage.currentUser));
  }

  this.setUserAuthenticated = function(data) {
    $window.localStorage.currentUser = JSON.stringify(data);
    setAuthorization(data);
    $rootScope.$broadcast('userLoggedIn');
  }

  this.authorization_token = function() {
    return 'Token token=' + _this.currentUser.token;
  }

  this.logOut = function() {
    reset();
    $window.localStorage.currentUser = null;
  }
});
