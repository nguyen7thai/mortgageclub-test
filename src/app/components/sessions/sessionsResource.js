sessionsModule.factory('sessionsResource', ['$resource', function($resource) {
  return $resource(API_SERVER + 'auth/:id.json',
    {
      id: '@id'
    }
  );
}])
