'use strict';

angular.module('notrApp')
  .controller('LibraryCtrl', function ($scope) {
    $scope.message = 'Hello';    
    $scope.files = [{'name': 'Tesseract Debrief', 'summary': 'Debriefing the incident at the tesseract facility', 'date': 'Apr 11, 2012'}, 
    				{'name': 'Debate 9', 'summary': 'Is Main Evil?', 'date': 'Mar 24, 2011'}];

  });
