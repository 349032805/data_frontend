'use strict';

describe('Controller: MarketingActivityCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var MarketingActivityCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketingActivityCtrl = $controller('MarketingActivityCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MarketingActivityCtrl.awesomeThings.length).toBe(3);
  });
});
