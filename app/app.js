var API_SERVER = 'https://young-beyond-8772.herokuapp.com/'
var mortGageClub = angular.module('mortGageClub',
  [
    'ngResource',
    'ui.router',
    'sessions',
    'travelers',
    'pageslide-directive'
  ]);

var sessionsModule = angular.module('sessions', []);
var travelersModule = angular.module('travelers', []);
