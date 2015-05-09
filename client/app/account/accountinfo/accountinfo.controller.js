'use strict';

angular.module('notrApp')
  .controller('AccountInfoCtrl', function ($scope, User) {
    $scope.user = User.get();
  });