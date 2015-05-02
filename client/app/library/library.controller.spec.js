'use strict';

describe('Controller: LibraryCtrl', function () {

  // load the controller's module
  beforeEach(module('notrApp'));

  var LibraryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LibraryCtrl = $controller('LibraryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
