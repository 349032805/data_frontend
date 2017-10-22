'use strict';

describe('Controller: StoreNewCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var StoreNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreNewCtrl = $controller('StoreNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StoreNewCtrl.awesomeThings.length).toBe(3);
  });
});
