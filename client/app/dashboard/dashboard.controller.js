'use strict';

angular.module('notrApp')
  .controller('DashboardCtrl',['$scope', 'Modal', 'notesService', function ($scope, Modal, notesService) {
    $scope.message = 'Hello';
    notesService.getNotes(function (notes) {
        $scope.notes = notes;
        // $scope.dates = [];

        // for(var i=0; i<notes.length; i++){
        // 	$scope.dates[i] = dateFormat(notes[i].date);
        // }

        $scope.dateFormat = function(date){
	    	console.log("getting date");
	    	var monthNames = [
		        "January", "February", "March",
		        "April", "May", "June", "July",
		        "August", "September", "October",
		        "November", "December"
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
  }]);
