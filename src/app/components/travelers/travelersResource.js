travelersModule.factory('travelersResource', ['$resource', function($resource) {
  return $resource(API_SERVER + 'travelers/:id.json', {
      id: '@id'
    }, {
      save: { method: 'PATCH' }
    });
  }
]);
