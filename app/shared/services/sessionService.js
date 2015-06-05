mortGageClub.service('SessionService', function($window, $rootScope) {
  _this = this;

  var reset = function() {
    _this.currentUser = null;
    _this.token = '';
    _this.name = '';
  }

  var setAuthorization = function(data) {
    _this.currentUser = data.id;
    _this.userName = data.name;
    _this.token = data.token;
  }

  if($window.localStorage.token != null) {
    setAuthorization($window.localStorage);
  }
  this.setUserAuthenticated = function(data) {
    $window.localStorage.id = data.id;
    $window.localStorage.token = data.token;
    $window.localStorage.name = data.name;
    setAuthorization(data);
    $rootScope.$broadcast('userLoggedIn');
  }

  this.authorization_token = function() {
    return 'Token token=' + _this.token;
  }

  this.logOut = function() {
    reset();
    $window.localStorage.id = '';
    $window.localStorage.token = '';
    $window.localStorage.name = '';
  }

  reset();
});
