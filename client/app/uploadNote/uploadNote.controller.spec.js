'use strict';

describe('Controller: UploadNoteCtrl', function () {

  // load the controller's module
  beforeEach(module('notrApp'));

  var UploadNoteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UploadNoteCtrl = $controller('UploadNoteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
