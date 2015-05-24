mortGageClub.controller('repositoryShowController',
  ['$scope', 'repositoriesResource', '$stateParams', function($scope, Repository, $stateParams) {
    var init = function() {
      Repository.get({ id: $stateParams.id }, function(data) {
        $scope.repository = data;
      });
    }
    init();
  }
]);
