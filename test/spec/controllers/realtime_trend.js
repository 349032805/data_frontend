'use strict';

describe('Controller: RealtimeTrendCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var RealtimeTrendCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RealtimeTrendCtrl = $controller('RealtimeTrendCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RealtimeTrendCtrl.awesomeThings.length).toBe(3);
  });
});
