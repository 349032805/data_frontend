'use strict';

describe('Controller: RetentionPhoneCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var RetentionPhoneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RetentionPhoneCtrl = $controller('RetentionPhoneCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RetentionPhoneCtrl.awesomeThings.length).toBe(3);
  });
});
