'use strict';

angular.module('notrApp')
  .controller('NotesCtrl', [ 'User', '$scope', 'notesService', '$routeParams', 'commentsService', function (User, $scope, notesService, $routeParams, commentsService) {
    notesService.getNote({ id: $routeParams.id }, function (note) {
    	$scope.note = note;
    	$scope.rating = note.ratingTotal / note.ratingNum;
    	// $scope.comments = note.comments;
    });
    commentsService.getComments({ id: $routeParams.id }, function (comments) {
    	$scope.comments = comments;
    });
    
    $scope.ratings = [1, 2, 3, 4, 5];

    var currentUser = User.get();
    $scope.submitComment = function() {
    	$scope.submittedComment = true;

    	console.log("here");
        // console.log($routeParams);
        // console.log($scope.comment);
    	if (typeof $scope.comment !== 'undefined') {
    		$scope.comment.user = currentUser._id;
    		// $scope.comment.rating = ;
    		// $scope.comment.body = $routeParams.body;
    		
            $scope.comment.noteRef = $scope.note._id;
            console.log($scope.comment);
            

            commentsService.postComment ($scope.comment, function (returnMessage ) {
                commentsService.getComments({ id: $routeParams.id }, function (comments) {
                $scope.comments = comments;
                $scope.comment = null;
                });
            });  
    	}


        console.log("not in the loop");
    };

    $scope.setRating = function (rating) {
        $scope.comment.rating = rating + 1;

    }

  }]);

