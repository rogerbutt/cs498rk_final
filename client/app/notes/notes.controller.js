'use strict';

angular.module('notrApp')
  .controller('NotesCtrl', [ 'notesService', '$routeParams', function ($scope, notesService, $routeParams) {
    $scope.message = 'Hello';
  }]);
