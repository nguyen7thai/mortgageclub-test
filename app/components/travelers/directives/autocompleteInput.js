travelersModule.directive('autocompleteInput', function() {
  return {
    restrict: 'C',
    transclude: true,
    link: function($scope, $element) {
      var autocomplete = new google.maps.places.Autocomplete($element[0]);
      google.maps.event.addListener(autocomplete, 'place_changed', function(data) {
        $scope.newDestination = autocomplete.getPlace().name;
      });
    }
  }
});
