'use strict';

angular.module('notrApp')
  .controller('LibraryCtrl', function ($scope, User) {
  	$scope.user = User.get();
    console.log($scope.user);

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

  });
