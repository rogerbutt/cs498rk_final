'use strict';

angular.module('notrApp')
  .controller('UploadNoteCtrl', [ '$scope', 'User', 'Upload', '$http','notesService', function ($scope, User, Upload, $http, notesService) {

  	/*$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });*/
 
    $scope.upload = function () {
      var files = $scope.files;

      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];

          $http.get('/api/aws?mimeType='+ file.type).success(function(response) {
            var s3Params = response;

            // File Upload for S3, but have to be caref

            Upload.upload({
              url: 'https://cs498rk-notr.s3.amazonaws.com/',
              method: 'POST',
              fields: {
                'key' : 's3notr/'+ Math.round(Math.random()*10000) + '$$' + file.name,
                'acl' : 'private',
                'Content-Type' : file.type,
                'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                'success_action_status' : '201',
                'Policy' : s3Params.s3Policy,
                'Signature' : s3Params.s3Signature,
              },
              file: file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
              console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
              console.log(data);
              User.get(function(user) {
                notesService.createNote({
                  name: $scope.name,
                  ownerName: user.name,
                  owner: user._id,
                  description: $scope.description,
                  price: $scope.price,
                  ref: data.PostResponse.Location,
                });
              });
            });
          });
        }
      }
    };

  }]);
