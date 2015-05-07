'use strict';

angular.module('notrApp')
  .controller('NotesCtrl', [ '$scope', 'notesService', '$routeParams', 'commentsService', function ($scope, notesService, $routeParams, commentsService) {
    notesService.getNote({ id: $routeParams.id }, function (note) {
    	$scope.note = note;
    	$scope.rating = note.ratingTotal / note.ratingNum;
    	// $scope.comments = note.comments;
    });
    commentsService.getComments({ id: $routeParams.id }, function (comments) {
    	$scope.comments = comments;
    });
  }]);
