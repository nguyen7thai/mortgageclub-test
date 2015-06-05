sessionsModule.controller('sessionsController',
  function($scope, $location, sessionsResource, SessionService) {
    $scope.session = {
      name: '',
    };

    $scope.create = function() {
      success = function(data) {
        SessionService.setUserAuthenticated(data)
        $location.path('/travelers')
      },
      error = function(data) {
        $scope.error = 'Invalid Login';
      }
      sessionsResource.save($scope.session).$promise.then(success, error);
    }
  }
);
