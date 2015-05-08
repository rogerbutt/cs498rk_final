'use strict';

angular.module('notrApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, notesService) {
    $scope.errors = {}; 
    $scope.reviews = [];
    var notes = notesService.getNotes();
    $scope.user = User.get(function (result) {
      for (var i in result.boughtNotes) {
        for (var j in notes) {
          if (result.boughtNotes[i] === notes[j].ref) {
            notes[j].date = new Date(notes[j].date).toDateString();
            $scope.reviews.push(notes[j]);
          }
        }
      }
      return result;
    });


    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};  
  });

/* Cited @ http://stackoverflow.com/questions/1987524/turn-a-number-into-star-rating-display-using-jquery-and-css */
$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
};