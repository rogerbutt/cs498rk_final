'use strict';

angular.module('notrApp')
  .controller('UploadNoteCtrl', [ '$scope', 'Upload', function ($scope) {

  	$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
 
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);

                // File Upload for S3, but have to be careful

                /* Upload.upload({
                    url: 'https://cs498rk-notr.s3.amazonaws.com/',
                    method: 'POST',
                    fields : {
                      key: file.name,
                      AWSAccessKeyId: <YOUR AWS AccessKey Id>, 
                      acl: 'public',
                      policy: $scope.policy,
                      signature: $scope.signature,
                      "Content-Type": file.type != '' ? file.type : 'application/octet-stream',
                      filename: file.name
                    },
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
