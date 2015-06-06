travelersModule.controller('travelersController',
  function($scope, travelersResource, SessionService, $filter) {
    var currentTravelerId = SessionService.currentUser.id;
    travelersResource.query(function(data) {
      $scope.travelers = data;
      $scope.currentTraveler = $filter('filter')($scope.travelers, {id: currentTravelerId})[0];
      $scope.$watch('currentTraveler.destinations', function(newValue, oldValue) {
        if(newValue === oldValue){
          return;
        }
        var params = { destinations: newValue };
        travelersResource.save({id: $scope.currentTraveler.id}, params, function(data) {
          console.log(data);
        });
      }, true);
    });
    $scope.newDestination = '';

    $scope.addDestination = function() {
      if($scope.newDestination.length > 0) {
        var destination = {
          name: $scope.newDestination,
          visited: false
        }
        $scope.newDestination = '';
        $scope.currentTraveler.destinations.push(destination);
      }
    }

    $scope.isCurrentTraveller = function(traveler) {
      return traveler.id == parseInt(currentTravelerId);
    }

    $scope.removeDestination = function(destination) {
      var index = $scope.currentTraveler.destinations.indexOf(destination);
      $scope.currentTraveler.destinations.splice(index, 1);
    }

    $scope.updateVisited = function(destination) {
      destination.visited = !destination.visited
    }
  }
);
