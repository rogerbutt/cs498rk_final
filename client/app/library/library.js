'use strict';

angular.module('notrApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/library', {
        templateUrl: 'app/library/library.html',
        controller: 'LibraryCtrl',
        authenticate: true
      });
});
