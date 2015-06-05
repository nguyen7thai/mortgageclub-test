mortGageClub.directive('menuButton', function(SessionService, $state, $rootScope) {
  return {
    restrict: 'C',
    scope: {},
    templateUrl: "/app/shared/directives/menu.html",
    link: function($scope, $element) {
      $scope.opened = false;
      var initValue = function() {
        if(SessionService.currentUser) {
          $scope.userLogin = true;
          $scope.helloUser = 'Hello, ' + SessionService.userName;
        } else {
          $scope.userLogin = false;
          $scope.helloUser = 'Please Login'
        };
      }
      initValue();
      $scope.changeOpenState = function() {
        $scope.opened = !$scope.opened;
        console.log($scope.opened)
      }
      $scope.logOut = function() {
        SessionService.logOut();
        initValue();
        $scope.opened = false;
        $state.go('start');
      }
      $rootScope.$on('userLoggedIn', function() {
        initValue();
      });
    }
  }
});
