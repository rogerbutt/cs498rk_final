'use strict';

angular.module('notrApp')
  .controller('AccountInfoCtrl', function ($scope, User) {
    $scope.user = User.get();
    $scope.additionalCredits;

    $scope.credit = function(form) {
      $scope.user.credits = $scope.user.credits + $scope.additionalCredits;
      $scope.additionalCredits = 0;
      User.addCredit({id:$scope.user._id}, $scope.user);
	};  

	$scope.deleteCard = function() {
		
	}
  });