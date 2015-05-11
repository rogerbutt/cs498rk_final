'use strict';

angular.module('notrApp')
  .controller('AccountInfoCtrl', ['$scope', '$modal', 'User', function ($scope, $modal, User) {
    $scope.user = User.get();
    $scope.additionalCredits = 0;
    $scope.button = 'disabled';
  
    $scope.$watch('user', function() {
      $scope.payment = $scope.user.paymentInfo;
      if ($scope.payment == "" || $scope.payment === undefined){
        $scope.nickname = "";
        $scope.expiration = "";
        $scope.cardMessage = "Add Card";
      } else {
        var creditInfo = $scope.payment.split(',');
        $scope.nickname = creditInfo[0];
        $scope.expiration = "Expires: " + creditInfo[2];
        $scope.cardMessage = "Edit Card";
        $scope.button = '';
      } 
    }, true);


    $scope.open = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'creditCard.html',
        controller: 'modalCtrl' 
      });
    }

    $scope.credit = function() {
      if ($scope.payment == "" || $scope.payment === undefined) {
        $scope.button = 'disabled';
      } else {
        $scope.button = '';
        $scope.user.credits = $scope.user.credits + $scope.additionalCredits;
        $scope.additionalCredits = 0;
        User.addCredit({id:$scope.user._id}, $scope.user);
      }
	  };  

  	$scope.deleteCard = function() {
      $scope.user.paymentInfo = "";
      $scope.button = 'disabled';
  		User.deleteCard({id:$scope.user._id}, $scope.user);
  	}
  }]);

angular.module('notrApp')
  .controller('modalCtrl', ['$scope', '$modalInstance', '$route', 'User', function($scope, $modalInstance, $route, User) {
    $scope.user = User.get();
    $scope.payment = $scope.user.paymentInfo;

    $scope.$watch('user', function() {
      $scope.payment = $scope.user.paymentInfo;
      if ($scope.payment === "" || $scope.payment == null) {
        $scope.nickname = "";
        $scope.cardnumber = "";
        $scope.expiration = "";
      } else {
        var creditInfo = $scope.payment.split(',');
        $scope.nickname = creditInfo[0];
        $scope.cardnumber = parseInt(creditInfo[1]);
        $scope.expiration = parseInt(creditInfo[2]);
      }
    }, true);

    $scope.save = function () {
      $scope.user.paymentInfo = $scope.nickname + "," + $scope.cardnumber + "," + $scope.expiration;
      $scope.payment = $scope.user.paymentInfo;
      User.editCard({id:$scope.user._id}, $scope.user);
      $route.reload();
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  }]);