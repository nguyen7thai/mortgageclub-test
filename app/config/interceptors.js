mortGageClub.factory('sessionInjector', function(SessionService) {
  return {
    request: function(config) {
      if (SessionService.currentUser) {
        config.headers['Authorization'] = SessionService.authorization_token();
      }
      return config;
    }
  };
});

mortGageClub.config(function($httpProvider) {
  $httpProvider.interceptors.push('sessionInjector');
});
