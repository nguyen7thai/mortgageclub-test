sessionsModule.factory('sessionsResource', function($resource) {
  return $resource(API_SERVER + 'auth/:id.json',
    {
      id: '@id'
    }
  );
});
