travelersModule.directive('travelerDropdown', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "/app/components/travelers/views/_travelerDropdown.html",
    link: function($scope, $element) {
      $scope.collapseIn = false;
      $scope.toggleCollapse = function() {
        $scope.collapseIn = !$scope.collapseIn;
      };
    }
  }
});
