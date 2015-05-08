'use strict';

angular.module('notrApp')
  .controller('UploadNoteCtrl', [ '$scope', 'Upload', function ($scope, Upload) {

  	$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
 
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // File Upload for S3, but have to be careful

                /* Upload.upload({
                    url: 'upload/url',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);

                    notesService.createNote({
						name: $scope.note.name
                    });
                }); */
            }
        }
    };

  }]);
