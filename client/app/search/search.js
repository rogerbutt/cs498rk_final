'use strict';

angular.module('notrApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/search', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
