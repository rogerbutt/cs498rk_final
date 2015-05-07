'use strict';

angular.module('notrApp')
  .controller('NotesCtrl', [ '$scope', 'notesService', '$routeParams', function ($scope, notesService, $routeParams) {
    notesService.getNote({ id: $routeParams.id }, function (note) {
    	$scope.note = note;
    	$scope.rating = note.ratingTotal / note.ratingNum;
    });
  }]);
