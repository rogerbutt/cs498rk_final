'use strict';

angular.module('notrApp')
  .controller('AccountInfoCtrl', function ($scope, $modal, User) {
    $scope.user = User.get();
    $scope.creditCard = $scope.user.paymentInfo;
    $scope.additionalCredits;
    if ($scope.user.paymentInfo === "" || $scope.user.paymentInfo == null) {
      $scope.cardMessage = "Add Card";
    } else {
      $scope.cardMessage = "Edit Card";
    }

    $scope.open = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'creditCard.html',
        controller: 'modalCtrl',
      });
    }

    $scope.credit = function() {
      $scope.user.credits = $scope.user.credits + $scope.additionalCredits;
      $scope.additionalCredits = 0;
      User.addCredit({id:$scope.user._id}, $scope.user);
	  };  

  	$scope.deleteCard = function() {
      $scope.user.paymentInfo = "";
  		User.deleteCard({id:$scope.user._id}, $scope.user);
  	}
  });

angular.module('notrApp').controller('modalCtrl', function($scope, $modalInstance) {
  $scope.save = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
});