travelersModule.directive('travelerDropdown', function() {
  return {
    restrict: 'E',
    scope: {
      traveler: '=info'
    },
    templateUrl: "/src/app/components/travelers/views/_travelerDropdown.html"
  }
});
