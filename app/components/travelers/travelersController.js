travelersModule.controller('travelersController',
  function($scope, travelersResource, SessionService, $filter) {
    var currentTravelerId = SessionService.currentUser.id;
    var updateDestinationList = function(updateMethod, target) {
      var cloneList = [];
      angular.copy($scope.currentTraveler.destinations, cloneList);
      updateMethod(cloneList);
      if(target) { target.updating = true; }

      var error = function(data) {
        if(target) { target.updating = false; }
        $scope.error = 'Something went wrong with Api!!!';
        console.log(data);
      }

      var success = function(data) {
        if(target) { target.updating = false; }
        $scope.error = '';
        $scope.currentTraveler.destinations = data.destinations;
        console.log(data);
      }

      var params = { destinations: cloneList };
      travelersResource.save({id: $scope.currentTraveler.id}, params, success, error);
    }

    travelersResource.query(function(data) {
      $scope.travelers = data;
      $scope.currentTraveler = $filter('filter')($scope.travelers, {id: currentTravelerId})[0];
      var rollback = false;
    });
    $scope.newDestination = '';

    $scope.addDestination = function() {
      if($scope.newDestination.length > 0) {
        var destination = {
          name: $scope.newDestination,
          visited: false
        }
        $scope.newDestination = '';

        updateDestinationList(function(list) {
          list.push(destination);
        });
      }
    }

    $scope.isCurrentTraveller = function(traveler) {
      return traveler.id == parseInt(currentTravelerId);
    }

    $scope.removeDestination = function(destination) {
      var index = $scope.currentTraveler.destinations.indexOf(destination);

      updateDestinationList(function(list) {
        list.splice(index, 1);
      }, destination);
    }

    $scope.updateVisited = function(destination) {
      updateDestinationList(function(list) {
        var item = $filter('filter')(list, {name: destination.name})[0];
        item.visited = !item.visited;
      }, destination);
    }
  }
);
