'use strict';

angular.module('notrApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
