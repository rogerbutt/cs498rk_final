'use strict';

angular.module('notrApp')
  .controller('NotesCtrl', [ 'User', '$scope', 'notesService', '$routeParams', 'commentsService', '$sce', function (User, $scope, notesService, $routeParams, commentsService, $sce) {
    notesService.getNote({ id: $routeParams.id }, function (note) {
    	$scope.note = note;
    	$scope.rating = note.ratingTotal / note.ratingNum;
        $scope.note.ref = $sce.trustAsResourceUrl(note.ref);
    	// $scope.comments = note.comments;
    });
    commentsService.getComments({ id: $routeParams.id }, function (comments) {
    	$scope.comments = comments;
    });
    
    $scope.ratings = [1, 2, 3, 4, 5];
    var currentUser = User.get();
    $scope.submitComment = function() {
    	$scope.submittedComment = true;

<<<<<<< HEAD
=======
        // console.log($routeParams);
        // console.log($scope.comment);
>>>>>>> 07d79acb8d3a666f29d2aa50b7ff6bda256c41a3
    	if (typeof $scope.comment !== 'undefined') {
    		$scope.comment.user = currentUser._id;    		
            $scope.comment.noteRef = $scope.note._id;
            console.log($scope.comment);
            
<<<<<<< HEAD
            commentsService.postComment ($scope.comment, function (returnMessage ) {
=======

            commentsService.postComment ($scope.comment, function () {
>>>>>>> 07d79acb8d3a666f29d2aa50b7ff6bda256c41a3
                commentsService.getComments({ id: $routeParams.id }, function (comments) {
                $scope.comments = comments;
                $scope.comment = null;
                });
            });  
    	}
    };

    $scope.setRating = function (rating) {
        if (typeof $scope.comment !== 'undefined' && typeof $scope.comment !== null) {
            $scope.comment.rating = rating + 1;
        }   
    };
    // $scope.setRating = function (rating) {
    //     $scope.comment.rating = rating + 1;
    // };

<<<<<<< HEAD
    // $scope.number = 5;
    $scope.getNumber = function(num) {
        // console.log(num);
        return new Array(num);   
    };

    $scope.updateDate = function(date) {
        return  date.val();
        // var $scope.date = "";
        // $scope.date = date.val().split('-');


        //     date = $date.val().split('-'),
        //     format = ['year', 'month', 'day'];
        // $.each(format, function(i, v) {
        //     $date.attr('data-' + v, +date[i]);
        // });

        // 2015-05-10T02:39:08.938Z
    };




=======
    };

    $scope.setRating = function (rating) {
        $scope.comment.rating = rating + 1;
    };
>>>>>>> 07d79acb8d3a666f29d2aa50b7ff6bda256c41a3

  }]);

