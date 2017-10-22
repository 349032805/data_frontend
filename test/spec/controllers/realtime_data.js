'use strict';

describe('Controller: RealtimeDataCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var RealtimeDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RealtimeDataCtrl = $controller('RealtimeDataCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RealtimeDataCtrl.awesomeThings.length).toBe(3);
  });
});
