sessionsModule.controller('sessionsController',
 ['$scope', '$location', 'sessionsResource', 'SessionService', function($scope, $location, Session, SessionService) {
  $scope.session = {
    name: '',
  };

  $scope.create = function() {
    success = function(data) {
      SessionService.setUserAuthenticated(data)
      $location.path('/travelers')
    },
    error = function(data) {
      alert('login failed');
    }
    Session.save($scope.session).$promise.then(success, error);
  }
}]);
