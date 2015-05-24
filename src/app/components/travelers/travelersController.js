travelersModule.controller('travelersController',
  ['$scope', 'travelersResource', function($scope, Traveler) {
    Traveler.query(function(data) {
      $scope.travelers = data;
      $scope.currentTraveler = data[0];
    });
    $scope.newDestination = null;

    $scope.addDestination = function() {
      var destination = {
        name: $scope.newDestination,
        visited: false
      }
      destinations = $scope.currentTraveler.destinations.concat(destination)

      Traveler.save({id: $scope.currentTraveler.id}, destinations, function(data) {
        $scope.currentTraveler.destinations.push(destination);
      });
    }
  }
]);
