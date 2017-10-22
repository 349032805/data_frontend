'use strict';

describe('Controller: RetentionStoreCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var RetentionStoreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RetentionStoreCtrl = $controller('RetentionStoreCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RetentionStoreCtrl.awesomeThings.length).toBe(3);
  });
});
