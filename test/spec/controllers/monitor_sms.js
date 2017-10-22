'use strict';

describe('Controller: MonitorSmsCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var MonitorSmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonitorSmsCtrl = $controller('MonitorSmsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MonitorSmsCtrl.awesomeThings.length).toBe(3);
  });
});
