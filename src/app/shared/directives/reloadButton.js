mortGageClub.directive('reloadButton', ['$state', function($state) {
  return {
    restrict: 'C',
    link: function(scope, element) {
      element.on('click', function() {
        $state.go($state.current, {}, {reload: true});
      });
    }
  }
}]);
