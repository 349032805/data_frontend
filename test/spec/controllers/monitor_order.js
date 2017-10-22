'use strict';

describe('Controller: MonitorOrderCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var MonitorOrderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonitorOrderCtrl = $controller('MonitorOrderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MonitorOrderCtrl.awesomeThings.length).toBe(3);
  });
});
