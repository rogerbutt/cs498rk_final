'use strict';

angular.module('notrApp')
  .controller('SearchCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.notes=[
    	{name:"Cat's in the bag"},
    	{name:"...and the bag's in the river"},
    	{name:"Crazy Handful of Nothin'"},
    	{name:"Dead Freight"},
    	{name:"Crawl Space"},
    	{name:"Box Cutter"},
    	{name:"Half Measures"}
    ];
  });
