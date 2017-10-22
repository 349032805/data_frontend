'use strict';

describe('Controller: MonitorStoreCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var MonitorStoreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonitorStoreCtrl = $controller('MonitorStoreCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MonitorStoreCtrl.awesomeThings.length).toBe(3);
  });
});
