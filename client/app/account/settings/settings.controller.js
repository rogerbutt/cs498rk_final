'use strict';

angular.module('notrApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, notesService) {
    $scope.errors = {}; 
    $scope.user = User.get(function (result) {
      $scope.reviews = result.boughtNotes;
      return result;
    });
      $scope.getNumber = function(num) {
            return new Array(num);   
      };

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