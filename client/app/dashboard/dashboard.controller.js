'use strict';

angular.module('notrApp')
  .controller('DashboardCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.notes = [{
    	name: "Note1",
    	description: "Here is a descreption",
    	date:new Date(),
    	rating:4 
    },{
    	name: "Note2",
    	description: "Here is a descreption",
    	date:new Date(),
    	rating:3 
    },{
    	name: "Note3",
    	description: "Here is a descreption",
    	date:new Date(),
    	rating:4 
    },{
    	name: "Note4",
    	description: "Here is a descreption",
    	date:new Date(),
    	rating:5 
    }];
  });
