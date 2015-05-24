travelersModule.directive('destination', function() {
  return {
    restrict: 'E',
    scope: {
      destination: '=info'
    },
    templateUrl: "/src/app/components/travelers/views/_destination.html",
    link: function(scope, element) {
      return null;
    }
  }
});
