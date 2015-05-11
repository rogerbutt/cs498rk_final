'use strict';

angular.module('notrApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, notesService) {
    $scope.errors = {}; 
    $scope.user = User.get(function (result) {
      $scope.reviews = result.boughtNotes;
      return result;
    });

     $scope.dateFormat = function(date){
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];
        var ret = "";
        var date = new Date(date);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        ret+= monthNames[monthIndex]+" "+day+", " + year;
        return ret;
      }

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