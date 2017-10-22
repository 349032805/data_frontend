'use strict';

describe('Controller: RetentionPermeationCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var RetentionPermeationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RetentionPermeationCtrl = $controller('RetentionPermeationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RetentionPermeationCtrl.awesomeThings.length).toBe(3);
  });
});
