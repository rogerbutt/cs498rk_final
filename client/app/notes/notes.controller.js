'use strict';

angular.module('notrApp')
  .controller('NotesCtrl', [ 'User', '$scope', 'notesService', '$routeParams', 'commentsService', '$sce', function (User, $scope, notesService, $routeParams, commentsService, $sce) {
    
    $scope.comment = {};

    notesService.getNote({ id: $routeParams.id }, function (note) {
    	$scope.note = note;
    	$scope.rating = note.ratingTotal / note.ratingNum;
        $scope.note.ref = $sce.trustAsResourceUrl(note.ref);
    });

    commentsService.getComments({ id: $routeParams.id }, function (comments) {
    	$scope.comments = comments;
    });
    
    $scope.ratings = [1, 2, 3, 4, 5];
    
    $scope.submitComment = function() {
    	$scope.submittedComment = true;

        User.get(function(user) {
            if($scope.comment.body === undefined)
                return;

            $scope.comment.user = user._id;          
            $scope.comment.noteRef = $scope.note._id;

            commentsService.postComment ($scope.comment, function () {
                commentsService.getComments({ id: $routeParams.id }, function (comments) {
                    $scope.comments = comments;
                    $scope.comment = {};
                });
            });
        });
    };

    $scope.setRating = function (rating) {
        $scope.comment.rating = rating + 1;  
        console.log($scope.comment);
        // document.getElementById("starImage").style.color = "blue";
    };

    $scope.getNumber = function(num) {
        return new Array(num);   
    };

    // $scope.changeColor = function () {
    //     $document.getElementById("startImage").style.color = "black";
    // }   




    // $scope.setRating = function (rating) {
    //     $scope.comment.rating = rating + 1;
    // };

  }]);

