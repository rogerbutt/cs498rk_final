'use strict';

angular.module('notrApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/uploadNote', {
        templateUrl: 'app/uploadNote/uploadNote.html',
        controller: 'UploadNoteCtrl',
        authenticate: true
      });
  });
