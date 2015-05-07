'use strict';

angular.module('notrApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/notes/:id', {
        templateUrl: 'app/notes/notes.html',
        controller: 'NotesCtrl'
      });
  });
