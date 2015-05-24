mortGageClub.factory('repositoriesResource', ['$resource', function($resource) {
  return $resource(API_SERVER +'repositories/:id.json', {
      id: '@id'
    });
  }
]);
