'use strict';

describe('Controller: StoreBusinessCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var StoreBusinessCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreBusinessCtrl = $controller('StoreBusinessCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StoreBusinessCtrl.awesomeThings.length).toBe(3);
  });
});
