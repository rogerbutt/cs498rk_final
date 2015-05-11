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

    	if (typeof $scope.comment !== 'undefined') {
    		$scope.comment.user = currentUser._id;    		
            $scope.comment.noteRef = $scope.note._id;
            console.log($scope.comment);

            commentsService.postComment ($scope.comment, function () {
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

    $scope.getNumber = function(num) {
        // console.log(num);
        return new Array(num);   
    };



    $scope.setRating = function (rating) {
        $scope.comment.rating = rating + 1;
    };

  }]);

