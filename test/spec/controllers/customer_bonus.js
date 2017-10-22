'use strict';

describe('Controller: CustomerBonusCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var CustomerBonusCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomerBonusCtrl = $controller('CustomerBonusCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CustomerBonusCtrl.awesomeThings.length).toBe(3);
  });
});
