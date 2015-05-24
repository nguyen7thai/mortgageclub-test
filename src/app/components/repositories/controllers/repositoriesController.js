mortGageClub.controller('repositoriesController',
  ['$scope', 'repositoriesResource', function($scope, Repository) {
    var init = function() {
      Repository.query(function(data) {
        $scope.repositories = data;
      });
    }
    init();
  }
]);
