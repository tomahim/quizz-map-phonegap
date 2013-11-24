'use strict';

var app = angular.module('mapquizz', ["leaflet-directive"]);

/* Route Config */

/*app.config(function($routeProvider, $httpProvider) {

      $routeProvider
      .when('/', 
        {templateUrl: 'partials/trips/trips', controller: 'TripsCtrl'}
      )
      .when('/add-trip', 
        {templateUrl: 'partials/trips/add-trip', controller: 'TripsCtrl'}
      )
      .otherwise({ redirectTo: '/' });
});
*/