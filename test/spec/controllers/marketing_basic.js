'use strict';

describe('Controller: MarketingBasicCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var MarketingBasicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketingBasicCtrl = $controller('MarketingBasicCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MarketingBasicCtrl.awesomeThings.length).toBe(3);
  });
});
