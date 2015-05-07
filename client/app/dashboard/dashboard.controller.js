'use strict';

angular.module('notrApp')
  .controller('DashboardCtrl',['$scope', 'Modal', 'notesService', function ($scope, Modal, notesService) {
    $scope.message = 'Hello';
    notesService.getNotes(function (notes) {
        $scope.notes = notes;
    });

    $scope.openModal = function(){
    	console.log("Here");
    }
  }]);
