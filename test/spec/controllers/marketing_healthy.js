'use strict';

describe('Controller: MarketingHealthyCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var MarketingHealthyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketingHealthyCtrl = $controller('MarketingHealthyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MarketingHealthyCtrl.awesomeThings.length).toBe(3);
  });
});
