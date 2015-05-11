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
  }]);
