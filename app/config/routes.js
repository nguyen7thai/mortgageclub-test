mortGageClub.config(
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('start', {
        url: '/',
        templateUrl: '/app/components/sessions/new.html',
        controller: 'sessionsController'
      })
      .state('travelers', {
        url: '/travelers',
        templateUrl: '/app/components/travelers/views/index.html',
        controller: 'travelersController',
        data: {
          requireLogin: true
        }
      });
  }
);

mortGageClub.run(function($rootScope, $state, SessionService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if((toState.data) && (toState.data.requireLogin)) {
      if(SessionService.currentUser == null) {
        event.preventDefault();
        $state.go('start');
      }
    }
  });
});
