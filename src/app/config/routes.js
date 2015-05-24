mortGageClub.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('start', {
        url: '/',
        templateUrl: '/src/app/components/sessions/new.html',
        controller: 'sessionsController'
      })
      .state('travelers', {
        url: '/travelers',
        templateUrl: '/src/app/components/travelers/views/index.html',
        controller: 'travelersController',
        data: {
          requireLogin: true
        }
      })
      .state('repositoryShow', {
        url: '/repository/:id',
        templateUrl: '/src/app/components/repositories/views/show.html',
        controller: 'repositoryShowController'
      });
  }
]);

mortGageClub.run(['$rootScope', '$state', 'SessionService', function($rootScope, $state, SessionService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if((toState.data) && (toState.data.requireLogin)) {
      if(SessionService.currentUser == null) {
        event.preventDefault();
        $state.go('start');
      }
    }
  });
}]);
