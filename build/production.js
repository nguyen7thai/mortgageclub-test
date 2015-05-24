var API_SERVER = 'https://young-beyond-8772.herokuapp.com/'
var mortGageClub = angular.module('mortGageClub',
  [
    'ngRoute',
    'ngResource',
    'ui.router',
    'sessions',
    'travelers'
  ]);

var sessionsModule = angular.module('sessions', []);

var travelersModule = angular.module('travelers', []);

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

mortGageClub.factory('repositoriesResource', ['$resource', function($resource) {
  return $resource(API_SERVER +'repositories/:id.json', {
      id: '@id'
    });
  }
]);

sessionsModule.controller('sessionsController',
 ['$scope', '$location', 'sessionsResource', 'SessionService', function($scope, $location, Session, SessionService) {
  $scope.session = {
    name: '',
  };

  $scope.create = function() {
    success = function(data) {
      SessionService.setUserAuthenticated(data)
      $location.path('/travelers')
    },
    error = function(data) {
      alert('login failed');
    }
    Session.save($scope.session).$promise.then(success, error);
  }
}]);

sessionsModule.factory('sessionsResource', ['$resource', function($resource) {
  return $resource(API_SERVER + 'auth/:id.json',
    {
      id: '@id'
    }
  );
}])

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

travelersModule.directive('travelerDropdown', function() {
  return {
    restrict: 'E',
    scope: {
      traveler: '=info'
    },
    templateUrl: "/src/app/components/travelers/views/_travelerDropdown.html"
  }
});

travelersModule.controller('travelersController',
  ['$scope', 'travelersResource', function($scope, Traveler) {
    Traveler.query(function(data) {
      $scope.travelers = data;
      $scope.currentTraveler = data[0];
    });
    $scope.newDestination = null;

    $scope.addDestination = function() {
      var destination = {
        name: $scope.newDestination,
        visited: false
      }
      destinations = $scope.currentTraveler.destinations.concat(destination)

      Traveler.save({id: $scope.currentTraveler.id}, destinations, function(data) {
        $scope.currentTraveler.destinations.push(destination);
      });
    }
  }
]);

travelersModule.factory('travelersResource', ['$resource', function($resource) {
  return $resource(API_SERVER + 'travelers/:id.json', {
      id: '@id'
    }, {
      save: { method: 'PATCH' }
    });
  }
]);

mortGageClub.factory('sessionInjector', ['SessionService', function(SessionService) {
  return {
    request: function(config) {
      if (SessionService.currentUser) {
        config.headers['Authorization'] = SessionService.authorization_token();
      }
      return config;
    }
  };
}]);

mortGageClub.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('sessionInjector');
}]);

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

mortGageClub.service('SessionService', ['$window', function($window) {
  _this = this;
  this.currentUser = null;
  this.token = '';
  var setAuthorization = function(data) {
    _this.currentUser = data.id;
    _this.token = data.token;
  }

  if($window.localStorage.token != null) {
    setAuthorization($window.localStorage);
  }
  this.setUserAuthenticated = function(data) {
    $window.localStorage.userid = data.id;
    $window.localStorage.token = data.token;
    setAuthorization(data);
  }

  this.authorization_token = function() {
    return 'Token token=' + _this.token;
  }
}]);
