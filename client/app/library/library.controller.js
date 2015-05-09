'use strict';

angular.module('notrApp')
  .controller('LibraryCtrl', function ($scope, User, notesService) {
  	$scope.boughtFiles = [];
    var notes = notesService.getNotes();
    User.get(function (result) {
      for (var i in result.boughtNotes) {
        for (var j in notes) {
          if (result.boughtNotes[i] === notes[j].ref) {
            notes[j].date = new Date(notes[j].date).toDateString();
            $scope.boughtFiles.push(notes[j]);
          }
        }
      }
    });
  });
