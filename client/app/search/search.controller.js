'use strict';

angular.module('notrApp')
  .controller('SearchCtrl', [ '$scope', 'notesService', function ($scope, notesService) {

    notesService.getNotes(function(notes) {
        $scope.notes = notes;
    });

  }]);
